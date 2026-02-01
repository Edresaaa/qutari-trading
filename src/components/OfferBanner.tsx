import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OfferBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-chocolate via-chocolate/95 to-chocolate/90">
        {/* Product images as decoration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20">
          <img 
            src="https://cdn.salla.sa/vygWG/6bcf7bb9-a121-4d4b-aa1b-5a40129e95e9-500x500-wevXPhBBwn1GjUvkKljbTU3HZP8tTkV2aIw3IqBf.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] opacity-15">
          <img 
            src="https://cdn.salla.sa/vygWG/df611ca4-111b-4717-87ac-77d349b7f72d-500x500-GTwfF30yVRDRarWwgVis4CvunAhbpvMXIPiAL0T2.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mr-auto text-right">
          <span className="inline-block bg-gold text-chocolate font-bold px-4 py-2 rounded-full text-sm mb-4">
            عرض خاص
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            خصم يصل إلى <span className="text-gold">50%</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            على جميع الغتر الكشميرية والشيلان الباشمينا الملكي
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
