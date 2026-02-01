import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSizeDisplay from "@/components/product/ProductSizeDisplay";
import { getProductById, getProductsByCategory, getCategories } from "@/lib/storage";
import { formatWhatsAppLink } from "@/config/store";
import { Product, Category } from "@/types/store";
import { ArrowRight, ShoppingBag, Check, Truck, Shield, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  
  // حالة المقاسات المختارة
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // إعادة تعيين المقاسات المختارة عند تغيير المنتج
        setSelectedSize("");
        setSelectedLength("");
        setSelectedWidth("");
        setSizeError(false);
        
        // Get category
        const categories = getCategories();
        const foundCategory = categories.find(c => c.slug === foundProduct.category);
        setCategory(foundCategory || null);

        // Get related products
        const categoryProducts = getProductsByCategory(foundProduct.category);
        setRelatedProducts(categoryProducts.filter(p => p.id !== id).slice(0, 4));
      } else {
        navigate("/products");
      }
    }
  }, [id, navigate]);

  // التحقق من أن المنتج يتطلب اختيار مقاس
  const requiresSize = product?.sizeType && product.sizeType !== "none" && (
    (product.availableSizes && product.availableSizes.length > 0) ||
    (product.availableLengths && product.availableLengths.length > 0)
  );

  // التحقق من أن المقاس المطلوب تم اختياره
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
      // التمرير إلى قسم المقاسات
      document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  };

  // إنشاء نص المقاس للرسالة
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">جاري تحميل المنتج...</p>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link to="/" className="hover:text-accent">الرئيسية</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-accent">المنتجات</Link>
            {category && (
              <>
                <ArrowRight className="w-4 h-4" />
                <Link to={`/products?category=${category.slug}`} className="hover:text-accent">
                  {category.name}
                </Link>
              </>
            )}
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {discountPercentage > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">
                    خصم {discountPercentage}%
                  </span>
                )}
                {product.featured && (
                  <span className="bg-gold text-chocolate text-sm font-bold px-3 py-1 rounded-full">
                    مميز
                  </span>
                )}
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <span className="bg-muted text-muted-foreground font-bold px-6 py-3 rounded-full">
                    نفذت الكمية
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Category */}
              {category && (
                <Link 
                  to={`/products?category=${category.slug}`}
                  className="inline-flex items-center gap-2 text-accent hover:text-gold mb-4"
                >
                  <span className="text-sm">{category.name}</span>
                </Link>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-accent">
                  {product.price} ر.ي
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice} ر.ي
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-2">الوصف</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {requiresSize && (
                <div id="size-section" className="mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    اختر المقاس
                    {sizeError && (
                      <span className="text-destructive text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
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
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">متوفر في المخزون</span>
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 text-destructive" />
                    <span className="text-destructive font-medium">نفذت الكمية</span>
                  </>
                )}
              </div>

              {/* CTA Button */}
              {product.inStock && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOrderClick}
                  className={`btn-gold flex items-center justify-center gap-3 text-lg py-4 mb-8 ${
                    requiresSize && !isSizeSelected() ? "opacity-80" : ""
                  }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>اطلب الآن عبر واتساب</span>
                </a>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Truck className="w-8 h-8 text-accent" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm">توصيل سريع</h4>
                    <p className="text-muted-foreground text-xs">لجميع المحافظات</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Shield className="w-8 h-8 text-accent" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm">ضمان الجودة</h4>
                    <p className="text-muted-foreground text-xs">منتجات أصلية 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">منتجات مشابهة</h2>
                <Link 
                  to={`/products?category=${product.category}`}
                  className="text-accent hover:text-gold flex items-center gap-1"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
