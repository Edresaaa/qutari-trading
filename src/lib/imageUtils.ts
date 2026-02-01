/**
 * Convert an image file to WebP format
 * @param file - The original image file
 * @param quality - Quality of the output image (0-1), default is 0.85
 * @returns Promise<File> - The converted WebP file
 */
export const convertToWebP = async (file: File, quality: number = 0.85): Promise<File> => {
  // If already webp, return as is
  if (file.type === 'image/webp') {
    return file;
  }

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas dimensions to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      ctx?.drawImage(img, 0, 0);
      
      // Convert to WebP blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create new file with .webp extension
            const originalName = file.name.replace(/\.[^/.]+$/, '');
            const webpFile = new File([blob], `${originalName}.webp`, {
              type: 'image/webp',
            });
            resolve(webpFile);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Create object URL for the file
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validate if file is a valid image type
 */
export const isValidImageType = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};
