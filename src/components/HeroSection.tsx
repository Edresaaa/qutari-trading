import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            أناقة <span className="text-gold">تعبّر عنك</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-slide-up">
            اكتشف أفخر الشيلان والأزياء التقليدية بجودة استثنائية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/products" className="btn-gold inline-flex items-center justify-center gap-2">
              <span>تسوق الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/categories" className="btn-gold-outline inline-flex items-center justify-center text-gold border-gold hover:bg-gold hover:text-chocolate">
              تصفح الأقسام
            </Link>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
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
