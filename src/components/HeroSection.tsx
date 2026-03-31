import { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getActiveBanners, getBanners, Banner } from "@/lib/storage";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const settings = useStoreSettings();

  useEffect(() => {
    const load = () => {
      const active = getActiveBanners();
      setBanners(active.length > 0 ? active : getBanners());
    };
    load();
    window.addEventListener('productsUpdated', load);
    return () => window.removeEventListener('productsUpdated', load);
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const waLink = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("مرحباً، معكم من " + settings.storeName + "\nأرغب في الاستفسار عن المنتجات المتوفرة لديكم")}`;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[320px] sm:h-[380px] md:h-[480px] lg:h-[540px]">
        <AnimatePresence mode="wait">
          {banners.map(
            (banner, index) =>
              index === currentSlide && (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background/95" />

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <motion.div
            className="max-w-lg text-right mr-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight text-foreground">
              منتجات مضمونة وبأسعار مناسبة
              <br />
              <span className="text-[#25D366]">اطلبها بسهولة عبر واتساب</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-5 md:mb-6 leading-relaxed max-w-md">
              تصفح المنتجات واطلب مباشرة – تعامل موثوق وشحن متوفر
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                اطلب الآن عبر واتساب
              </a>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-muted/60 hover:bg-muted text-foreground text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold transition-all"
              >
                تصفح المنتجات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#25D366] w-6"
                    : "bg-foreground/20 w-1.5 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
