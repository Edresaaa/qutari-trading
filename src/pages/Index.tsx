import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PromoBanners from "@/components/PromoBanners";
import OfferBanner from "@/components/OfferBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";
import TestimonialsSection from "@/components/reviews/TestimonialsSection";
import { getCategories, getFeaturedProducts } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types/store";
import { motion } from "framer-motion";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = () => {
      setFeaturedProducts(getFeaturedProducts());
      setCategories(getCategories());
    };
    loadData();
    const handleStorageChange = () => { loadData(); };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PromoBanners />

        {/* Categories Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation variant="slideRight">
              <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                <div>
                  <h2 className="section-title">الأقسام</h2>
                  <p className="text-muted-foreground mt-2 sm:mt-3 text-sm sm:text-base">تصفح أقسامنا المتنوعة</p>
                </div>
                <Link 
                  to="/categories" 
                  className="flex items-center gap-2 text-accent hover:text-gold-light font-medium transition-colors text-sm sm:text-base"
                >
                  عرض الكل
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </ScrollAnimation>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {categories.map((category) => (
                <StaggerItem key={category.id}>
                  <CategoryCard category={category} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 sm:py-16 md:py-20 bg-card">
          <div className="container mx-auto px-4">
            <ScrollAnimation variant="slideRight">
              <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                <div>
                  <h2 className="section-title">منتجات مميزة</h2>
                  <p className="text-muted-foreground mt-2 sm:mt-3 text-sm sm:text-base">أفضل اختياراتنا لك</p>
                </div>
                <Link 
                  to="/products" 
                  className="flex items-center gap-2 text-accent hover:text-gold-light font-medium transition-colors text-sm sm:text-base"
                >
                  عرض الكل
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <OfferBanner />

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient leather-texture" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          </div>
          
          <motion.div 
            className="container mx-auto px-4 text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 sm:mb-5">
              هل تبحث عن شيء <span className="gold-text">مميز</span>؟
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              تواصل معنا عبر الواتساب وسنساعدك في إيجاد ما تبحث عنه
            </p>
            <motion.a
              href="https://wa.me/967736700034"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              تواصل معنا
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
