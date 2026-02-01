// نوع المقاسات المختلفة لكل نوع منتج
export type ProductSizeType = 
  | "shawl"      // شيلات
  | "thobe"      // أثواب
  | "kufi"       // كوافي
  | "underwear"  // ملابس داخلية
  | "none";      // بدون مقاسات

// مقاسات الشيلات
export const SHAWL_SIZES = ["50", "52", "54", "56", "58", "60", "62"] as const;
export type ShawlSize = typeof SHAWL_SIZES[number];

// مقاسات الأثواب - الطول بالانش
export const THOBE_LENGTH_SIZES = [
  "42", "43", "44", "45", "46", "47", "48", "49", "50",
  "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
  "61", "62"
] as const;
export type ThobeLengthSize = typeof THOBE_LENGTH_SIZES[number];

// مقاسات الأثواب - العرض
export const THOBE_WIDTH_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type ThobeWidthSize = typeof THOBE_WIDTH_SIZES[number];

// مقاسات الكوافي
export const KUFI_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type KufiSize = typeof KUFI_SIZES[number];

// مقاسات الملابس الداخلية
export const UNDERWEAR_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"] as const;
export type UnderwearSize = typeof UNDERWEAR_SIZES[number];

// واجهة مقاسات المنتج
export interface ProductSizes {
  type: ProductSizeType;
  availableSizes?: string[];  // المقاسات المتاحة
  // للأثواب فقط
  availableLengths?: string[];
  availableWidths?: string[];
}

// خريطة أنواع المقاسات مع العرض
export const SIZE_TYPE_LABELS: Record<ProductSizeType, string> = {
  shawl: "شيلات / غتر",
  thobe: "أثواب",
  kufi: "كوافي",
  underwear: "ملابس داخلية",
  none: "بدون مقاسات",
};

// دالة للحصول على المقاسات الافتراضية حسب النوع
export const getDefaultSizesForType = (type: ProductSizeType): Partial<ProductSizes> => {
  switch (type) {
    case "shawl":
      return { type, availableSizes: [...SHAWL_SIZES] };
    case "thobe":
      return { 
        type, 
        availableLengths: [...THOBE_LENGTH_SIZES],
        availableWidths: [...THOBE_WIDTH_SIZES]
      };
    case "kufi":
      return { type, availableSizes: [...KUFI_SIZES] };
    case "underwear":
      return { type, availableSizes: [...UNDERWEAR_SIZES] };
    default:
      return { type: "none" };
  }
};
