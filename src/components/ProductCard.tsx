import { useEffect, useState, forwardRef } from "react";
import { Product } from "@/types/store";
import { formatWhatsAppLink } from "@/config/store";
import { MessageCircle, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  return (
    <motion.div 
      ref={ref}
      className="group card-premium flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'opacity-60' : ''}`}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Quick view - hidden on touch devices, shown on hover */}
        <Link
          to={`/product/${product.id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full card-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {hasDiscount && !isOutOfStock && (
            <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
              خصم {discountPercentage}%
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-muted text-muted-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
              غير متوفر
            </span>
          )}
        </div>

        {/* Rating badge on image */}
        {reviews.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-[11px] font-bold text-foreground">{avgRating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block flex-1">
          <h3 className="font-bold text-foreground mb-1.5 line-clamp-2 text-sm sm:text-base leading-relaxed hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xl sm:text-2xl font-bold ${isOutOfStock ? 'text-muted-foreground' : 'gold-text'}`}>
            {product.price}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">ر.ي</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through mr-auto">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
            !isOutOfStock
              ? "btn-gold"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => isOutOfStock && e.preventDefault()}
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{!isOutOfStock ? "اشتري الآن" : "غير متوفر"}</span>
        </a>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
