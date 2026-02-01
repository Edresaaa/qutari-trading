import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create SVG with Arabic text
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a3d2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#0d2418;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a3d2e;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a55c;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e8d5a3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#9d7f3a;stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      
      <!-- Leather texture pattern -->
      <pattern id="leatherPattern" patternUnits="userSpaceOnUse" width="20" height="20">
        <rect width="20" height="20" fill="#0d2418"/>
        <circle cx="10" cy="10" r="8" fill="#1a3d2e" opacity="0.3"/>
      </pattern>
      <rect width="1200" height="630" fill="url(#leatherPattern)" opacity="0.4"/>
      
      <!-- Gold border -->
      <rect x="30" y="30" width="1140" height="570" fill="none" stroke="url(#goldGrad)" stroke-width="2" rx="5"/>
      <rect x="45" y="45" width="1110" height="540" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.5" rx="3"/>
      
      <!-- Corner decorations -->
      <g fill="url(#goldGrad)" opacity="0.8">
        <!-- Top left -->
        <path d="M30,80 L30,30 L80,30 M30,30 L60,60" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <circle cx="30" cy="30" r="5"/>
        
        <!-- Top right -->
        <path d="M1120,30 L1170,30 L1170,80 M1170,30 L1140,60" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <circle cx="1170" cy="30" r="5"/>
        
        <!-- Bottom left -->
        <path d="M30,550 L30,600 L80,600 M30,600 L60,570" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <circle cx="30" cy="600" r="5"/>
        
        <!-- Bottom right -->
        <path d="M1170,550 L1170,600 L1120,600 M1170,600 L1140,570" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <circle cx="1170" cy="600" r="5"/>
      </g>
      
      <!-- Hexagon logo shape -->
      <polygon points="600,180 660,210 660,270 600,300 540,270 540,210" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
      <polygon points="600,195 645,218 645,262 600,285 555,262 555,218" fill="#0d2418" stroke="url(#goldGrad)" stroke-width="1" opacity="0.8"/>
      
      <!-- Arabic letter ق in hexagon -->
      <text x="600" y="255" text-anchor="middle" fill="url(#goldGrad)" font-family="Tajawal, Arial, sans-serif" font-size="40" font-weight="700" filter="url(#glow)">ق</text>
      
      <!-- Main title -->
      <text x="600" y="380" text-anchor="middle" fill="url(#goldGrad)" font-family="Tajawal, Arial, sans-serif" font-size="72" font-weight="700" filter="url(#glow)" direction="rtl">القوطاري للتجارة</text>
      
      <!-- Subtitle -->
      <text x="600" y="450" text-anchor="middle" fill="#c9a55c" font-family="Tajawal, Arial, sans-serif" font-size="36" font-weight="500" opacity="0.9" direction="rtl">أناقة الرجل اليمني</text>
      
      <!-- Decorative line -->
      <line x1="350" y1="490" x2="850" y2="490" stroke="url(#goldGrad)" stroke-width="1" opacity="0.5"/>
      <circle cx="600" cy="490" r="4" fill="url(#goldGrad)"/>
      
      <!-- Small diamonds -->
      <polygon points="340,490 350,485 360,490 350,495" fill="url(#goldGrad)" opacity="0.6"/>
      <polygon points="840,490 850,485 860,490 850,495" fill="url(#goldGrad)" opacity="0.6"/>
    </svg>
  `;

  // Return the SVG as an image
  return new Response(svg, {
    headers: {
      ...corsHeaders,
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    },
  });
});
