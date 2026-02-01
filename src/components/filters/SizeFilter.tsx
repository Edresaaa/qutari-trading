import { useState, useMemo } from "react";
import { Product } from "@/types/store";
import { 
  SHAWL_SIZES, 
  THOBE_LENGTH_SIZES, 
  THOBE_WIDTH_SIZES, 
  KUFI_SIZES, 
  UNDERWEAR_SIZES,
  ProductSizeType,
  SIZE_TYPE_LABELS
} from "@/types/sizes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

interface SizeFilterProps {
  products: Product[];
  selectedSizeType: ProductSizeType | "";
  selectedSize: string;
  selectedLength: string;
  selectedWidth: string;
  onSizeTypeChange: (type: ProductSizeType | "") => void;
  onSizeChange: (size: string) => void;
  onLengthChange: (length: string) => void;
  onWidthChange: (width: string) => void;
  onClearSizeFilter: () => void;
}

const SizeFilter = ({
  products,
  selectedSizeType,
  selectedSize,
  selectedLength,
  selectedWidth,
  onSizeTypeChange,
  onSizeChange,
  onLengthChange,
  onWidthChange,
  onClearSizeFilter,
}: SizeFilterProps) => {
  // حساب المقاسات المتاحة فعلياً في المنتجات
  const availableSizeTypes = useMemo(() => {
    const types = new Set<ProductSizeType>();
    products.forEach(p => {
      if (p.sizeType && p.sizeType !== "none") {
        types.add(p.sizeType);
      }
    });
    return Array.from(types);
  }, [products]);

  // المقاسات المتاحة حسب النوع المختار
  const availableSizes = useMemo(() => {
    if (!selectedSizeType) return [];
    
    const sizes = new Set<string>();
    products
      .filter(p => p.sizeType === selectedSizeType)
      .forEach(p => {
        p.availableSizes?.forEach(s => sizes.add(s));
      });
    return Array.from(sizes).sort((a, b) => {
      // Sort numerically if possible
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  }, [products, selectedSizeType]);

  const availableLengths = useMemo(() => {
    if (selectedSizeType !== "thobe") return [];
    
    const lengths = new Set<string>();
    products
      .filter(p => p.sizeType === "thobe")
      .forEach(p => {
        p.availableLengths?.forEach(l => lengths.add(l));
      });
    return Array.from(lengths).sort((a, b) => parseInt(a) - parseInt(b));
  }, [products, selectedSizeType]);

  const availableWidths = useMemo(() => {
    if (selectedSizeType !== "thobe") return [];
    
    const widths = new Set<string>();
    products
      .filter(p => p.sizeType === "thobe")
      .forEach(p => {
        p.availableWidths?.forEach(w => widths.add(w));
      });
    const order = ["S", "M", "L", "XL", "XXL", "3XL"];
    return Array.from(widths).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [products, selectedSizeType]);

  const hasActiveFilter = selectedSizeType || selectedSize || selectedLength || selectedWidth;

  if (availableSizeTypes.length === 0) {
    return null;
  }

  const renderSizeButtons = (
    sizes: string[],
    selected: string,
    onClick: (size: string) => void,
    label: string
  ) => (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onClick(selected === size ? "" : size)}
            className={cn(
              "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border",
              selected === size
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-muted border-border hover:border-accent/50"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-foreground text-sm">فلترة حسب المقاس</h3>
        </div>
        {hasActiveFilter && (
          <button
            onClick={onClearSizeFilter}
            className="text-xs text-destructive hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            مسح
          </button>
        )}
      </div>

      {/* اختيار نوع المقاس */}
      <div className="space-y-2 mb-3">
        <Label className="text-xs text-muted-foreground">نوع المنتج</Label>
        <div className="flex flex-wrap gap-1.5">
          {availableSizeTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                onSizeTypeChange(selectedSizeType === type ? "" : type);
                onSizeChange("");
                onLengthChange("");
                onWidthChange("");
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                selectedSizeType === type
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-muted border-border hover:border-accent/50"
              )}
            >
              {SIZE_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* المقاسات حسب النوع المختار */}
      {selectedSizeType && selectedSizeType !== "thobe" && availableSizes.length > 0 && (
        renderSizeButtons(availableSizes, selectedSize, onSizeChange, "المقاس")
      )}

      {selectedSizeType === "thobe" && (
        <div className="space-y-3">
          {availableLengths.length > 0 && renderSizeButtons(
            availableLengths,
            selectedLength,
            onLengthChange,
            "الطول (انش)"
          )}
          {availableWidths.length > 0 && renderSizeButtons(
            availableWidths,
            selectedWidth,
            onWidthChange,
            "العرض"
          )}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
