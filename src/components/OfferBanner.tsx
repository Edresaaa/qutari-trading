import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OfferBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://cdn.files.salla.network/homepage/1501369604/c4a9153b-7507-4c00-953c-3fb9020c4505.webp')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-chocolate/95 via-chocolate/80 to-chocolate/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mr-auto text-right">
          <span className="inline-block bg-gold text-chocolate font-bold px-4 py-2 rounded-full text-sm mb-4">
            عرض خاص
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            خصم يصل إلى <span className="text-gold">40%</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            على جميع الشيلان الكشميرية الترمه والباشمينا VIP
          </p>
          <Link
            to="/products"
            className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            تسوق الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
