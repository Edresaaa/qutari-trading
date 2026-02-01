import { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const banners = [
  {
    id: "1",
    image: "https://cdn.salla.sa/vygWG/fc857e5a-15b1-4f48-a8a0-eef08200f007-500x500-wKiTygOIxKOUotrIB2usaw4SCg0fqXsv3FHojQ3F.jpg",
    title: "غتر كشميري VIP",
    subtitle: "أجود أنواع الغتر الكشميرية الشتوية",
    link: "/products?category=kashmiri-vip",
  },
  {
    id: "2",
    image: "https://cdn.salla.sa/vygWG/dd6c4672-2221-4d1f-81df-2905eb278dc4-500x500-NvuOunZPRjErJDSCu7Kn0tGmt4Rz5FdpkGaHkBjf.jpg",
    title: "شيلان باشمينا ملكي",
    subtitle: "صوف كشميري 100% بجودة استثنائية",
    link: "/products?category=pashmina-royal",
  },
  {
    id: "3",
    image: "https://cdn.salla.sa/vygWG/fcb6c396-c90b-4466-86d6-355e5baad27f-500x500-jIccBxG0LWqHG5iE6qnTglkEyy9P3QyeKR2VPPDz.jpg",
    title: "أشمغة شتوية دافئة",
    subtitle: "تشكيلة متنوعة من الأشمغة الشتوية",
    link: "/products?category=winter-shemagh",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Main Slider */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Background with product image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-chocolate via-chocolate/95 to-chocolate/90">
              {/* Large product image */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-30 md:opacity-50">
                <img 
                  src={banner.image} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-chocolate/60 to-chocolate" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-right mr-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
                  {banner.title.split(" ").map((word, i) => (
                    <span key={i} className={i === 0 ? "block" : ""}>
                      {i === 1 ? (
                        <span className="text-gold">{word}</span>
                      ) : (
                        word
                      )}{" "}
                    </span>
                  ))}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-slide-up">
                  {banner.subtitle}
                </p>
                <Link
                  to={banner.link}
                  className="btn-gold inline-flex items-center justify-center gap-2 text-lg px-8 py-4 animate-slide-up"
                >
                  <span>تسوق الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={nextSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-chocolate transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={prevSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-chocolate transition-all duration-300 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gold w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 38.8 480 53.7 576 58.3C672 63 768 57.3 864 50C960 42.7 1056 33.7 1152 35.8C1248 38 1344 51.3 1392 58L1440 64.7V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
