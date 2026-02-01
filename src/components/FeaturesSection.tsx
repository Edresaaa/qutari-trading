import { Truck, Shield, Headphones, CreditCard, Gift, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "خدمة عملاء",
    description: "في خدمتكم طوال الوقت 24/7",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Truck,
    title: "شحن مجاني",
    description: "شحن مجاني على طلباتك",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "منتجات أصلية 100%",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: CreditCard,
    title: "دفع آمن",
    description: "طرق دفع متعددة وآمنة",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Gift,
    title: "تغليف فاخر",
    description: "تغليف هدايا مجاني",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: RefreshCw,
    title: "استبدال سهل",
    description: "سياسة استبدال مرنة",
    color: "bg-accent/10 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 group"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
