import { Star } from "lucide-react";

interface ProductRatingBadgeProps {
  averageRating: number;
  reviewCount: number;
}

const ProductRatingBadge = ({ averageRating, reviewCount }: ProductRatingBadgeProps) => {
  if (reviewCount === 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Star className="w-4 h-4 fill-accent text-accent" />
      <span className="font-bold text-foreground">{averageRating}</span>
      <span className="text-muted-foreground">({reviewCount})</span>
    </div>
  );
};

export default ProductRatingBadge;
