import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductSizeType,
  SIZE_TYPE_LABELS,
  SHAWL_SIZES,
  THOBE_LENGTH_SIZES,
  THOBE_WIDTH_SIZES,
  KUFI_SIZES,
  UNDERWEAR_SIZES,
} from "@/types/sizes";

interface ProductSizesSelectorProps {
  sizeType: ProductSizeType;
  availableSizes: string[];
  availableLengths: string[];
  availableWidths: string[];
  onSizeTypeChange: (type: ProductSizeType) => void;
  onAvailableSizesChange: (sizes: string[]) => void;
  onAvailableLengthsChange: (lengths: string[]) => void;
  onAvailableWidthsChange: (widths: string[]) => void;
}

const ProductSizesSelector = ({
  sizeType,
  availableSizes,
  availableLengths,
  availableWidths,
  onSizeTypeChange,
  onAvailableSizesChange,
  onAvailableLengthsChange,
  onAvailableWidthsChange,
}: ProductSizesSelectorProps) => {
  
  const handleSizeTypeChange = (value: ProductSizeType) => {
    onSizeTypeChange(value);
    // Reset sizes when type changes
    onAvailableSizesChange([]);
    onAvailableLengthsChange([]);
    onAvailableWidthsChange([]);
  };

  const toggleSize = (size: string, current: string[], setter: (sizes: string[]) => void) => {
    if (current.includes(size)) {
      setter(current.filter(s => s !== size));
    } else {
      setter([...current, size]);
    }
  };

  const selectAllSizes = (allSizes: readonly string[], current: string[], setter: (sizes: string[]) => void) => {
    if (current.length === allSizes.length) {
      setter([]);
    } else {
      setter([...allSizes]);
    }
  };

  const renderSizeCheckboxes = (
    sizes: readonly string[],
    selectedSizes: string[],
    onChange: (sizes: string[]) => void,
    label: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <button
          type="button"
          onClick={() => selectAllSizes(sizes, selectedSizes, onChange)}
          className="text-xs text-accent hover:underline"
        >
          {selectedSizes.length === sizes.length ? "إلغاء الكل" : "تحديد الكل"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label
            key={size}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
              selectedSizes.includes(size)
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-muted border-border hover:border-accent/50"
            }`}
          >
            <Checkbox
              checked={selectedSizes.includes(size)}
              onCheckedChange={() => toggleSize(size, selectedSizes, onChange)}
              className="hidden"
            />
            <span className="text-sm font-medium">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
      <div>
        <Label className="mb-2 block">نوع المقاسات</Label>
        <Select value={sizeType} onValueChange={(v) => handleSizeTypeChange(v as ProductSizeType)}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع المقاسات" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SIZE_TYPE_LABELS) as ProductSizeType[]).map((type) => (
              <SelectItem key={type} value={type}>
                {SIZE_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sizeType === "shawl" && renderSizeCheckboxes(
        SHAWL_SIZES,
        availableSizes,
        onAvailableSizesChange,
        "مقاسات الشيلات / الغتر"
      )}

      {sizeType === "thobe" && (
        <div className="space-y-4">
          {renderSizeCheckboxes(
            THOBE_LENGTH_SIZES,
            availableLengths,
            onAvailableLengthsChange,
            "الطول (بالانش)"
          )}
          {renderSizeCheckboxes(
            THOBE_WIDTH_SIZES,
            availableWidths,
            onAvailableWidthsChange,
            "العرض"
          )}
        </div>
      )}

      {sizeType === "kufi" && renderSizeCheckboxes(
        KUFI_SIZES,
        availableSizes,
        onAvailableSizesChange,
        "مقاسات الكوافي"
      )}

      {sizeType === "underwear" && renderSizeCheckboxes(
        UNDERWEAR_SIZES,
        availableSizes,
        onAvailableSizesChange,
        "مقاسات الملابس الداخلية"
      )}

      {sizeType === "none" && (
        <p className="text-sm text-muted-foreground text-center py-2">
          هذا المنتج لا يحتاج لمقاسات
        </p>
      )}
    </div>
  );
};

export default ProductSizesSelector;
