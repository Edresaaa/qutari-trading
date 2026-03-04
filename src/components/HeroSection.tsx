import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getActiveBanners, getBanners, Banner } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

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

  if (banners.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[560px]">
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
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/75 to-background/95" />

                  <div className="relative h-full container mx-auto px-4 flex items-center">
                    <motion.div
                      className="max-w-lg text-right mr-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <span className="inline-block text-[10px] sm:text-xs font-semibold text-accent mb-2 tracking-wide uppercase">
                        مجموعة حصرية
                      </span>
                      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight text-foreground">
                        {banner.title}
                      </h1>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-2 max-w-md">
                        {banner.subtitle}
                      </p>
                      <Link
                        to={banner.link}
                        className="btn-gold inline-flex items-center gap-2 text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3"
                      >
                        تسوق الآن
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-accent w-6"
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
