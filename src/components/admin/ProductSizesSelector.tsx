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
  GHUTRA_SIZES,
  THOBE_LENGTH_SIZES,
  THOBE_WIDTH_SIZES,
  KUFI_SIZES,
  UNDERWEAR_SIZES,
  FUTAH_SIZES,
  MAAWIZ_SIZES,
  RING_SIZES,
  JACKET_SIZES,
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

  const getSizesConfig = (): { sizes: readonly string[]; label: string } | null => {
    switch (sizeType) {
      case "shawl": return { sizes: SHAWL_SIZES, label: "مقاسات الشيلان" };
      case "ghutra": return { sizes: GHUTRA_SIZES, label: "مقاسات الغتر" };
      case "kufi": return { sizes: KUFI_SIZES, label: "مقاسات الكوافي" };
      case "underwear": return { sizes: UNDERWEAR_SIZES, label: "مقاسات الملابس الداخلية" };
      case "futah": return { sizes: FUTAH_SIZES, label: "مقاسات الفوط" };
      case "maawiz": return { sizes: MAAWIZ_SIZES, label: "مقاسات المعاوز" };
      case "ring": return { sizes: RING_SIZES, label: "مقاسات الخواتم" };
      case "jacket": return { sizes: JACKET_SIZES, label: "مقاسات الاكوات" };
      default: return null;
    }
  };

  const sizesConfig = getSizesConfig();

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

      {sizeType === "thobe" && (
        <div className="space-y-4">
          {renderSizeCheckboxes(THOBE_LENGTH_SIZES, availableLengths, onAvailableLengthsChange, "الطول (بالانش)")}
          {renderSizeCheckboxes(THOBE_WIDTH_SIZES, availableWidths, onAvailableWidthsChange, "العرض")}
        </div>
      )}

      {sizeType !== "thobe" && sizeType !== "none" && sizesConfig && (
        renderSizeCheckboxes(sizesConfig.sizes, availableSizes, onAvailableSizesChange, sizesConfig.label)
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
