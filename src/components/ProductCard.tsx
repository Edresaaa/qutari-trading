import { Product } from "@/types/store";
import { formatWhatsAppLink } from "@/config/store";
import { MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${currentUrl}/products/${product.id}`;
  const whatsappLink = formatWhatsAppLink(product.name, productUrl, product.price);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300" />
        
        {/* Quick view button */}
        <Link
          to={`/product/${product.id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-chocolate text-foreground"
        >
          <Eye className="w-5 h-5" />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full">
              خصم {discountPercentage}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1.5 rounded-full">
              نفذت الكمية
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
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-accent">{product.price}</span>
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
            product.inStock
              ? "btn-gold"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          onClick={(e) => !product.inStock && e.preventDefault()}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{product.inStock ? "اشتري الآن" : "غير متوفر"}</span>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
