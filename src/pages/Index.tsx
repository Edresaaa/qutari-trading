import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TrustSection from "@/components/TrustSection";
import ReassuranceSection from "@/components/ReassuranceSection";
import PromoBanners from "@/components/PromoBanners";
import OfferBanner from "@/components/OfferBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import TestimonialsSection from "@/components/reviews/TestimonialsSection";
import { getCategories, getFeaturedProducts } from "@/lib/storage";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types/store";
import { storeConfig } from "@/config/store";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = () => {
      setFeaturedProducts(getFeaturedProducts());
      setCategories(getCategories());
    };
    load();
    window.addEventListener('productsUpdated', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('productsUpdated', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const waLink = `https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("مرحباً، معكم من القوطاري للتجارة\nأرغب في الاستفسار عن المنتجات المتوفرة لديكم")}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <HeroSection />
        <FeaturesSection />
        <TrustSection />

        {/* Categories */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">تسوق حسب القسم</h2>
              <Link
                to="/categories"
                className="flex items-center gap-1 text-[#25D366] text-xs sm:text-sm font-medium hover:gap-2 transition-all"
              >
                الكل
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 sm:overflow-visible sm:gap-3">
              {categories.map((category) => (
                <div key={category.id} className="shrink-0 w-[120px] sm:w-auto">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <PromoBanners />

        {/* Featured Products */}
        <section className="py-8 sm:py-12 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">منتجات مميزة</h2>
              <Link
                to="/products"
                className="flex items-center gap-1 text-[#25D366] text-xs sm:text-sm font-medium hover:gap-2 transition-all"
              >
                الكل
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <ReassuranceSection />
        <TestimonialsSection />
        <OfferBanner />

        {/* Final CTA */}
        <section className="py-10 sm:py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#25D366]/5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
              هل تبحث عن شيء <span className="text-[#25D366]">مميز</span>؟
            </h2>
            <p className="text-muted-foreground mb-2 max-w-sm mx-auto text-xs sm:text-sm">
              تواصل معنا عبر الواتساب وسنساعدك في إيجاد ما تبحث عنه
            </p>
            <p className="text-muted-foreground mb-5 max-w-sm mx-auto text-[10px] sm:text-xs">
              يمكنك السؤال قبل الشراء – نوضح لك كل التفاصيل
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل معنا
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
