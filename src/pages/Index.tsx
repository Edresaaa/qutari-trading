import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PromoBanners from "@/components/PromoBanners";
import OfferBanner from "@/components/OfferBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import TestimonialsSection from "@/components/reviews/TestimonialsSection";
import { getCategories, getFeaturedProducts } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types/store";

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PromoBanners />

        {/* Categories */}
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">الأقسام</h2>
              <Link
                to="/categories"
                className="flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:overflow-visible">
              {categories.map((category) => (
                <div key={category.id} className="shrink-0 w-[140px] sm:w-auto">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-10 sm:py-14 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">منتجات مميزة</h2>
              <Link
                to="/products"
                className="flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <OfferBanner />

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              هل تبحث عن شيء <span className="gold-text">مميز</span>؟
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base">
              تواصل معنا عبر الواتساب وسنساعدك في إيجاد ما تبحث عنه
            </p>
            <a
              href="https://wa.me/967736700034"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-sm px-6 py-3"
            >
              تواصل معنا
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
