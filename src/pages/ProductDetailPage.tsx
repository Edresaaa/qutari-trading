import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSizeDisplay from "@/components/product/ProductSizeDisplay";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewsList from "@/components/reviews/ReviewsList";
import { getProductById, getProductsByCategory, getCategories } from "@/lib/storage";
import { formatWhatsAppLink } from "@/config/store";
import { Review, getProductReviews, getAverageRating } from "@/lib/reviews";
import { Product, Category } from "@/types/store";
import { ArrowRight, ShoppingBag, Check, Truck, Shield, Package, AlertCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/reviews/StarRating";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = () => {
    if (id) getProductReviews(id).then(setReviews);
  };

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize("");
        setSelectedLength("");
        setSelectedWidth("");
        setSizeError(false);
        
        const categories = getCategories();
        const foundCategory = categories.find(c => c.slug === foundProduct.category);
        setCategory(foundCategory || null);

        const categoryProducts = getProductsByCategory(foundProduct.category);
        setRelatedProducts(categoryProducts.filter(p => p.id !== id).slice(0, 4));
        
        getProductReviews(id).then(setReviews);
      } else {
        navigate("/products");
      }
    }
  }, [id, navigate]);

  const requiresSize = product?.sizeType && product.sizeType !== "none" && (
    (product.availableSizes && product.availableSizes.length > 0) ||
    (product.availableLengths && product.availableLengths.length > 0)
  );

  const isSizeSelected = () => {
    if (!requiresSize) return true;
    if (product?.sizeType === "thobe") {
      const needsLength = product.availableLengths && product.availableLengths.length > 0;
      const needsWidth = product.availableWidths && product.availableWidths.length > 0;
      return (!needsLength || selectedLength) && (!needsWidth || selectedWidth);
    }
    return selectedSize !== "";
  };

  const handleSizeSelect = (size: string, length?: string, width?: string) => {
    setSelectedSize(size);
    if (length !== undefined) setSelectedLength(length);
    if (width !== undefined) setSelectedWidth(width);
    setSizeError(false);
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (requiresSize && !isSizeSelected()) {
      e.preventDefault();
      setSizeError(true);
      document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  };

  const getSizeText = () => {
    if (!requiresSize) return "";
    if (product?.sizeType === "thobe") {
      const parts = [];
      if (selectedLength) parts.push(`الطول: ${selectedLength} انش`);
      if (selectedWidth) parts.push(`العرض: ${selectedWidth}`);
      return parts.join(" - ");
    }
    return selectedSize ? `المقاس: ${selectedSize}` : "";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          url: window.location.href,
        });
      } catch {}
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base">جاري تحميل المنتج...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappLink = formatWhatsAppLink(
    product.name,
    window.location.href,
    product.price,
    getSizeText()
  );

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = !product.inStock || (product.quantity !== undefined && product.quantity === 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-4 sm:py-6 md:py-8 pb-20 lg:pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-wrap">
            <Link to="/" className="hover:text-accent">الرئيسية</Link>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link to="/products" className="hover:text-accent">المنتجات</Link>
            {category && (
              <>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <Link to={`/products?category=${category.slug}`} className="hover:text-accent">
                  {category.name}
                </Link>
              </>
            )}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Product Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-square sm:aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden bg-muted sticky top-20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
                  {discountPercentage > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full">
                      خصم {discountPercentage}%
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-gold text-accent-foreground text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full">
                      مميز
                    </span>
                  )}
                </div>

                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="absolute top-3 sm:top-4 left-3 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <span className="bg-muted text-muted-foreground font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
                      نفذت الكمية
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                {product.name}
              </h1>

              {/* Category */}
              {category && (
                <Link 
                  to={`/products?category=${category.slug}`}
                  className="inline-flex items-center gap-2 text-accent hover:text-gold mb-3 sm:mb-4 text-sm"
                >
                  <span>{category.name}</span>
                </Link>
              )}

              {/* Price & Rating */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  {product.price} ر.ي
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg md:text-xl text-muted-foreground line-through">
                    {product.originalPrice} ر.ي
                  </span>
                )}
              </div>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <StarRating rating={Math.round(getAverageRating(reviews))} size="sm" />
                  <span className="text-xs sm:text-sm text-muted-foreground">({reviews.length} تقييم)</span>
                </div>
              )}

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">الوصف</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {requiresSize && (
                <div id="size-section" className="mb-4 sm:mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-sm sm:text-base">
                    اختر المقاس
                    {sizeError && (
                      <span className="text-destructive text-xs sm:text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        يرجى اختيار المقاس
                      </span>
                    )}
                  </h3>
                  <ProductSizeDisplay
                    sizeType={product.sizeType!}
                    availableSizes={product.availableSizes}
                    availableLengths={product.availableLengths}
                    availableWidths={product.availableWidths}
                    onSizeSelect={handleSizeSelect}
                    selectedSize={selectedSize}
                    selectedLength={selectedLength}
                    selectedWidth={selectedWidth}
                  />
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                {!isOutOfStock ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-green-500 font-medium text-sm sm:text-base">متوفر في المخزون</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                    <span className="text-destructive font-medium text-sm sm:text-base">نفذت الكمية</span>
                  </>
                )}
              </div>

              {/* CTA Button */}
              {!isOutOfStock && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOrderClick}
                  className={`btn-gold flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg py-3.5 sm:py-4 mb-6 sm:mb-8 ${
                    requiresSize && !isSizeSelected() ? "opacity-80" : ""
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>اطلب الآن عبر واتساب</span>
                </a>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-xl">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground text-xs sm:text-sm">توصيل سريع</h4>
                    <p className="text-muted-foreground text-[10px] sm:text-xs">لجميع المحافظات</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-xl">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground text-xs sm:text-sm">ضمان الجودة</h4>
                    <p className="text-muted-foreground text-[10px] sm:text-xs">منتجات أصلية 100%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">التقييمات</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <ReviewsList reviews={reviews} />
              <ReviewForm productId={product.id} onSubmitted={loadReviews} />
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">منتجات مشابهة</h2>
                <Link 
                  to={`/products?category=${product.category}`}
                  className="text-accent hover:text-gold flex items-center gap-1 text-sm"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
