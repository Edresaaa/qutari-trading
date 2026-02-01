import { Product } from "@/types/store";
import { formatWhatsAppLink } from "@/config/store";
import { MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${currentUrl}/product/${product.id}`;
  const whatsappLink = formatWhatsAppLink(product.name, productUrl, product.price, product.image);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Check if product is out of stock based on quantity
  const isOutOfStock = !product.inStock || (product.quantity !== undefined && product.quantity === 0);

  return (
    <motion.div 
      className="group card-premium"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'opacity-60' : ''}`}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Quick view button */}
        <Link
          to={`/product/${product.id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full card-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Eye className="w-6 h-6" />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {hasDiscount && !isOutOfStock && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              خصم {discountPercentage}%
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1.5 rounded-full">
              غير متوفر
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 min-h-[3rem] leading-relaxed">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span className={`text-2xl font-bold ${isOutOfStock ? 'text-muted-foreground' : 'gold-text'}`}>{product.price}</span>
          <span className="text-sm text-muted-foreground">ر.ي</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through mr-auto">
              {product.originalPrice} ر.ي
            </span>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold transition-all duration-300 ${
            !isOutOfStock
              ? "btn-gold"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => isOutOfStock && e.preventDefault()}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{!isOutOfStock ? "اشتري الآن" : "غير متوفر"}</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
