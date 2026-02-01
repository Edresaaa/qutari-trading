import { Truck, Shield, Headphones, CreditCard, Gift, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Headphones,
    title: "خدمة عملاء",
    description: "في خدمتكم طوال الوقت 24/7",
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
    description: "طرق دفع متعددة وآمنة",
  },
  {
    icon: Gift,
    title: "تغليف فاخر",
    description: "تغليف هدايا مجاني",
  },
  {
    icon: RefreshCw,
    title: "استبدال سهل",
    description: "سياسة استبدال مرنة",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300 hover:bg-secondary group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-accent group-hover:shadow-gold">
                <feature.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
