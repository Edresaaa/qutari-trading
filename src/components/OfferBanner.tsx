import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { getOfferSettings, OfferSettings } from "@/lib/storage";

const OfferBanner = () => {
  const [offerSettings, setOfferSettings] = useState<OfferSettings | null>(null);

  useEffect(() => {
    const load = () => setOfferSettings(getOfferSettings());
    load();
    window.addEventListener('productsUpdated', load);
    return () => window.removeEventListener('productsUpdated', load);
  }, []);

  if (!offerSettings || !offerSettings.isActive) return null;

  const offerEndDate = new Date(offerSettings.endDate);
  if (offerEndDate <= new Date()) return null;

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mr-auto text-right">
          <span className="inline-block bg-accent/15 text-accent font-bold px-4 py-1.5 rounded-full text-xs mb-4">
            عرض خاص
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            خصم يصل إلى <span className="gold-text">{offerSettings.discountPercentage}%</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
            {offerSettings.subtitle}
          </p>

          <div className="mb-8">
            <p className="text-xs text-muted-foreground mb-3">ينتهي العرض خلال:</p>
            <CountdownTimer targetDate={offerEndDate} />
          </div>

          <Link
            to="/products"
            className="btn-gold inline-flex items-center gap-2 text-sm px-7 py-3"
          >
            تسوق الآن
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
