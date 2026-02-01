import { Product } from "@/types/store";
import { formatWhatsAppLink } from "@/config/store";
import { MessageCircle, Tag } from "lucide-react";

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
    <div className="card-product group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
              خصم {discountPercentage}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded">
              نفذت الكمية
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-accent">{product.price} ر.ي</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice} ر.ي
            </span>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
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
