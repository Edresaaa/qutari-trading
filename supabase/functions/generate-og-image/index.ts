import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Generate OG image with correct Arabic text
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: `Create a luxury OG image (1200x630px, 16:9 aspect ratio) for a Yemeni men's fashion store:

Background: Deep Hermes green leather texture with subtle snake skin pattern
Border: Elegant thin gold ornamental frame with decorative corners

In the CENTER of the image, write these Arabic texts in elegant gold color:
- Main title (large, bold): القوطاري للتجارة
- Subtitle (smaller, below main title): أناقة الرجل اليمني

The text must be exactly as written above in Arabic. Use luxurious gold gradient for the text with subtle glow effect. The overall style should be premium, elegant, and suitable for a high-end fashion brand.`
          }
        ],
        modalities: ["image", "text"]
      })
    });

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.images?.[0]?.image_url?.url) {
      throw new Error("No image generated");
    }

    const imageDataUrl = data.choices[0].message.images[0].image_url.url;
    
    // Extract base64 data
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    // Upload to Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload("og-image.png", imageBuffer, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/assets/og-image.png`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrl,
        message: "OG image generated and uploaded successfully" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error generating OG image:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
