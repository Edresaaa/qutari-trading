import { Truck, Shield, Headphones, CreditCard, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Headphones,
    title: "خدمة عملاء",
    description: "في خدمتكم 24/7",
  },
  {
    icon: Truck,
    title: "شحن مجاني",
    description: "شحن مجاني على طلباتك",
  },
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "منتجات أصلية 100%",
  },
  {
    icon: CreditCard,
    title: "دفع آمن",
    description: "طرق دفع متعددة",
  },
  {
    icon: RefreshCw,
    title: "استبدال سهل",
    description: "سياسة مرنة",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex overflow-x-auto pb-2 gap-4 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:gap-6 sm:overflow-visible sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:bg-secondary group min-w-[120px] sm:min-w-0 shrink-0 sm:shrink"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-accent group-hover:shadow-gold">
                <feature.icon className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-foreground text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 whitespace-nowrap">{feature.title}</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground whitespace-nowrap">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
