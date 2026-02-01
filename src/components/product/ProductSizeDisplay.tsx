import { useState } from "react";
import { SIZE_TYPE_LABELS, ProductSizeType } from "@/types/sizes";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ProductSizeDisplayProps {
  sizeType: ProductSizeType;
  availableSizes?: string[];
  availableLengths?: string[];
  availableWidths?: string[];
  onSizeSelect?: (size: string, length?: string, width?: string) => void;
  selectedSize?: string;
  selectedLength?: string;
  selectedWidth?: string;
}

const ProductSizeDisplay = ({
  sizeType,
  availableSizes = [],
  availableLengths = [],
  availableWidths = [],
  onSizeSelect,
  selectedSize,
  selectedLength,
  selectedWidth,
}: ProductSizeDisplayProps) => {
  const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize || "");
  const [localSelectedLength, setLocalSelectedLength] = useState(selectedLength || "");
  const [localSelectedWidth, setLocalSelectedWidth] = useState(selectedWidth || "");

  if (sizeType === "none" || (!availableSizes.length && !availableLengths.length)) {
    return null;
  }

  const handleSizeClick = (size: string) => {
    setLocalSelectedSize(size);
    onSizeSelect?.(size, localSelectedLength, localSelectedWidth);
  };

  const handleLengthClick = (length: string) => {
    setLocalSelectedLength(length);
    onSizeSelect?.(localSelectedSize, length, localSelectedWidth);
  };

  const handleWidthClick = (width: string) => {
    setLocalSelectedWidth(width);
    onSizeSelect?.(localSelectedSize, localSelectedLength, width);
  };

  const renderSizeButtons = (
    sizes: string[],
    selected: string,
    onClick: (size: string) => void,
    label: string
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onClick(size)}
            className={cn(
              "min-w-[3rem] px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all",
              selected === size
                ? "bg-accent text-accent-foreground border-accent shadow-lg scale-105"
                : "bg-muted border-border hover:border-accent/50 hover:bg-accent/10"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">
          {SIZE_TYPE_LABELS[sizeType]}
        </span>
      </div>

      {sizeType === "thobe" ? (
        <div className="space-y-4">
          {availableLengths.length > 0 && renderSizeButtons(
            availableLengths,
            localSelectedLength,
            handleLengthClick,
            "الطول (بالانش)"
          )}
          {availableWidths.length > 0 && renderSizeButtons(
            availableWidths,
            localSelectedWidth,
            handleWidthClick,
            "العرض"
          )}
        </div>
      ) : (
        availableSizes.length > 0 && renderSizeButtons(
          availableSizes,
          localSelectedSize,
          handleSizeClick,
          "المقاس"
        )
      )}
    </div>
  );
};

export default ProductSizeDisplay;
