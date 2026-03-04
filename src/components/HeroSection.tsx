import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getBanners, getActiveBanners, Banner } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const loadBanners = () => {
      const activeBanners = getActiveBanners();
      setBanners(activeBanners.length > 0 ? activeBanners : getBanners());
    };
    loadBanners();
    const handleUpdate = () => { loadBanners(); };
    window.addEventListener('productsUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('productsUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
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
      {/* Main Slider - responsive heights */}
      <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) => (
            index === currentSlide && (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Full Banner Image */}
                <div className="absolute inset-0">
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Responsive overlay - stronger on mobile for readability */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background/95 md:via-background/70 md:to-background/90" />
                  
                  {/* Corner accents - hidden on small screens */}
                  <div className="hidden sm:block absolute top-6 right-6 md:top-8 md:right-8 w-20 h-20 md:w-24 md:h-24">
                    <div className="absolute top-0 right-0 w-12 md:w-16 h-[2px] bg-gradient-to-l from-accent/60 to-transparent" />
                    <div className="absolute top-0 right-0 w-[2px] h-12 md:h-16 bg-gradient-to-b from-accent/60 to-transparent" />
                  </div>
                  <div className="hidden sm:block absolute bottom-6 left-6 md:bottom-8 md:left-8 w-20 h-20 md:w-24 md:h-24">
                    <div className="absolute bottom-0 left-0 w-12 md:w-16 h-[2px] bg-gradient-to-r from-accent/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[2px] h-12 md:h-16 bg-gradient-to-t from-accent/60 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <motion.div 
                    className="max-w-lg md:max-w-2xl text-right mr-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.span 
                      className="inline-block text-xs sm:text-sm font-medium text-accent mb-3 tracking-wider"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      مجموعة حصرية
                    </motion.span>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                      {banner.title.split(" ").map((word, i) => (
                        <span key={i} className={i === 0 ? "block text-foreground" : ""}>
                          {i === 1 ? (
                            <span className="gold-text">{word}</span>
                          ) : (
                            <span className="text-foreground">{word}</span>
                          )}{" "}
                        </span>
                      ))}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-md md:max-w-xl line-clamp-2 sm:line-clamp-none">
                      {banner.subtitle}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={banner.link}
                        className="btn-gold inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 md:py-4"
                      >
                        <span>تسوق الآن</span>
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Dots - adjusted for mobile */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent w-8 md:w-10"
                  : "bg-foreground/20 w-2 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
