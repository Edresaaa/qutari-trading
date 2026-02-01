import { supabase } from "@/integrations/supabase/client";
import { convertToWebP, isValidImageType } from "./imageUtils";

export const uploadProductImage = async (file: File): Promise<string | null> => {
  try {
    if (!isValidImageType(file)) {
      console.error('Invalid file type');
      return null;
    }

    // Convert to WebP format
    const webpFile = await convertToWebP(file);
    
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, webpFile, {
        contentType: 'image/webp',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

export const uploadCategoryImage = async (file: File): Promise<string | null> => {
  try {
    if (!isValidImageType(file)) {
      console.error('Invalid file type');
      return null;
    }

    // Convert to WebP format
    const webpFile = await convertToWebP(file);
    
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filePath = `categories/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, webpFile, {
        contentType: 'image/webp',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

export const uploadBannerImage = async (file: File): Promise<string | null> => {
  try {
    if (!isValidImageType(file)) {
      console.error('Invalid file type');
      return null;
    }

    // Convert to WebP format
    const webpFile = await convertToWebP(file);
    
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filePath = `banners/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, webpFile, {
        contentType: 'image/webp',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};
