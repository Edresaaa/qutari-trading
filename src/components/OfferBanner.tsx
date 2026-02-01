import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

const OfferBanner = () => {
  // Set offer end date (7 days from now for demo)
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 7);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with leather texture */}
      <div className="absolute inset-0 leather-bg">
        {/* Decorative circles */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Product images as decoration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-15">
          <img 
            src="https://cdn.salla.sa/vygWG/a664a3a9-6907-48cf-925f-5de7e4fb802b-500x500-OvOjbabZREkBiRRRnQdUaqIyHGwcsl4iuqrQmcjy.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] opacity-10">
          <img 
            src="https://cdn.salla.sa/vygWG/1a9d85fb-d373-4132-bf08-1851247c3009-500x500-ZaVg35qEEznJkyxOin2NHTYc3CI2YXurpyxAlryA.jpg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Border accents */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-2xl mr-auto text-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-accent text-accent-foreground font-bold px-5 py-2 rounded-full text-sm mb-6 shadow-gold">
            عرض خاص
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
            خصم يصل إلى <span className="gold-text">50%</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            على جميع الغتر الكشميرية والشيلان الباشمينا الملكي
          </p>
          
          {/* Countdown Timer */}
          <div className="mb-10">
            <p className="text-sm text-muted-foreground mb-4">ينتهي العرض خلال:</p>
            <CountdownTimer targetDate={offerEndDate} />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/products"
              className="btn-gold inline-flex items-center gap-3 text-lg px-10 py-4"
            >
              تسوق الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferBanner;
