import { useEffect, useState, forwardRef } from "react";
import { Product } from "@/types/store";
import { formatWhatsAppLink } from "@/config/store";
import { MessageCircle, Star, Flame, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductReviews, getAverageRating, Review } from "@/lib/reviews";

interface ProductCardProps {
  product: Product;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${currentUrl}/product/${product.id}`;
  const whatsappLink = formatWhatsAppLink(product.name, productUrl, product.price);

  useEffect(() => {
    getProductReviews(product.id).then(setReviews);
  }, [product.id]);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  const isOutOfStock = !product.inStock || (product.quantity !== undefined && product.quantity === 0);
  const avgRating = getAverageRating(reviews);

  // Urgency logic
  const isFeatured = product.featured;
  const isLowStock = product.quantity !== undefined && product.quantity > 0 && product.quantity <= 5;

  return (
    <div
      ref={ref}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-[#25D366]/30 transition-all duration-300 hover:shadow-lg flex flex-col"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? "opacity-50 grayscale-[30%]" : ""}`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {hasDiscount && !isOutOfStock && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-md">
              خصم {discountPercentage}%
            </span>
          )}
          {isFeatured && !isOutOfStock && (
            <span className="bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <Flame className="w-3 h-3" />
              الأكثر طلباً
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              كمية محدودة
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-muted/90 text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
              نفذ
            </span>
          )}
        </div>

        {/* Rating */}
        {reviews.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-[10px] font-bold text-foreground">{avgRating}</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block flex-1 mb-2">
          <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 hover:text-[#25D366] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className={`text-lg font-bold ${isOutOfStock ? "text-muted-foreground" : "text-[#25D366]"}`}>
            {product.price}
          </span>
          <span className="text-[10px] text-muted-foreground">ر.ي</span>
          {hasDiscount && (
            <span className="text-[10px] text-muted-foreground line-through mr-auto">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Availability hint */}
        {!isOutOfStock && (
          <p className="text-[10px] text-[#25D366]/80 mb-2 font-medium">
            ✓ متوفر حالياً
          </p>
        )}

        {/* CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            !isOutOfStock
              ? "bg-[#25D366] text-white hover:bg-[#20bd5a] active:scale-[0.97] shadow-sm"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => isOutOfStock && e.preventDefault()}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{!isOutOfStock ? "اطلب عبر واتساب" : "غير متوفر"}</span>
        </a>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
