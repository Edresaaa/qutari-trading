import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "خدمة عملاء",
    description: "في خدمتكم طوال الوقت 24/7",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "توصيل لجميع المناطق",
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
];

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                <feature.icon className="w-7 h-7 text-accent" />
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
