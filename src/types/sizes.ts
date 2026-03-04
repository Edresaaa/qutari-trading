// نوع المقاسات المختلفة لكل نوع منتج
export type ProductSizeType = 
  | "shawl"      // شيلان
  | "ghutra"     // غتر
  | "thobe"      // ثياب
  | "kufi"       // كوافي
  | "underwear"  // ملابس داخلية
  | "futah"      // فوط
  | "maawiz"     // معاوز
  | "ring"       // خواتم
  | "jacket"     // اكوات
  | "none";      // بدون مقاسات

// مقاسات الشيلان
export const SHAWL_SIZES = ["50", "52", "54", "56", "58", "60", "62"] as const;
export type ShawlSize = typeof SHAWL_SIZES[number];

// مقاسات الغتر
export const GHUTRA_SIZES = ["50", "52", "54", "56", "58", "60", "62"] as const;
export type GhutraSize = typeof GHUTRA_SIZES[number];

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

// مقاسات الفوط
export const FUTAH_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type FutahSize = typeof FUTAH_SIZES[number];

// مقاسات المعاوز
export const MAAWIZ_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"] as const;
export type MaawizSize = typeof MAAWIZ_SIZES[number];

// مقاسات الخواتم
export const RING_SIZES = ["6", "7", "8", "9", "10", "11", "12", "13"] as const;
export type RingSize = typeof RING_SIZES[number];

// مقاسات الاكوات
export const JACKET_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"] as const;
export type JacketSize = typeof JACKET_SIZES[number];

// واجهة مقاسات المنتج
export interface ProductSizes {
  type: ProductSizeType;
  availableSizes?: string[];
  availableLengths?: string[];
  availableWidths?: string[];
}

// خريطة أنواع المقاسات مع العرض
export const SIZE_TYPE_LABELS: Record<ProductSizeType, string> = {
  shawl: "شيلان",
  ghutra: "غتر",
  thobe: "ثياب",
  kufi: "كوافي",
  underwear: "ملابس داخلية",
  futah: "فوط",
  maawiz: "معاوز",
  ring: "خواتم",
  jacket: "اكوات",
  none: "بدون مقاسات",
};

// دالة للحصول على المقاسات الافتراضية حسب النوع
export const getDefaultSizesForType = (type: ProductSizeType): Partial<ProductSizes> => {
  switch (type) {
    case "shawl":
      return { type, availableSizes: [...SHAWL_SIZES] };
    case "ghutra":
      return { type, availableSizes: [...GHUTRA_SIZES] };
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
    case "futah":
      return { type, availableSizes: [...FUTAH_SIZES] };
    case "maawiz":
      return { type, availableSizes: [...MAAWIZ_SIZES] };
    case "ring":
      return { type, availableSizes: [...RING_SIZES] };
    case "jacket":
      return { type, availableSizes: [...JACKET_SIZES] };
    default:
      return { type: "none" };
  }
};
