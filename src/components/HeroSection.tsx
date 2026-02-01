import { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getBanners, getActiveBanners, Banner } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const activeBanners = getActiveBanners();
    setBanners(activeBanners.length > 0 ? activeBanners : getBanners());
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      {/* Main Slider */}
      <div className="relative h-[550px] md:h-[650px] lg:h-[750px]">
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
                {/* Background with glass effect */}
                <div className="absolute inset-0 hero-gradient leather-bg">
                  {/* Subtle grid pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(hsl(38 45% 45% / 0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, hsl(38 45% 45% / 0.1) 1px, transparent 1px)`,
                      backgroundSize: '60px 60px'
                    }}
                  />
                  
                  {/* Large product image with glow */}
                  <motion.div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 0.4, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent blur-3xl" />
                    <img 
                      src={banner.image} 
                      alt="" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/70 to-background" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-12 right-12 w-32 h-32 border border-accent/20 rounded-full opacity-30" />
                  <div className="absolute bottom-24 left-24 w-24 h-24 border border-accent/15 rounded-full opacity-20" />
                  
                  {/* Corner accents */}
                  <div className="absolute top-8 right-8 w-24 h-24">
                    <div className="absolute top-0 right-0 w-16 h-[2px] bg-gradient-to-l from-accent/50 to-transparent" />
                    <div className="absolute top-0 right-0 w-[2px] h-16 bg-gradient-to-b from-accent/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-24 h-24">
                    <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-gradient-to-r from-accent/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[2px] h-16 bg-gradient-to-t from-accent/50 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <motion.div 
                    className="max-w-2xl text-right mr-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.span 
                      className="inline-block text-sm font-medium text-accent mb-4 tracking-wider"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      مجموعة حصرية
                    </motion.span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
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
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                      {banner.subtitle}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={banner.link}
                        className="btn-gold inline-flex items-center justify-center gap-3 text-lg px-10 py-4"
                      >
                        <span>تسوق الآن</span>
                        <ArrowLeft className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={nextSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full card-glass flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={prevSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full card-glass flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent w-10"
                  : "bg-foreground/20 w-2 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
