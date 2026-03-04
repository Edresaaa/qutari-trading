import { Truck, Shield, Headphones, CreditCard, RefreshCw } from "lucide-react";

const features = [
  { icon: Headphones, title: "خدمة عملاء 24/7" },
  { icon: Truck, title: "شحن مجاني" },
  { icon: Shield, title: "جودة مضمونة" },
  { icon: CreditCard, title: "دفع آمن" },
  { icon: RefreshCw, title: "استبدال سهل" },
];

const FeaturesSection = () => {
  return (
    <section className="py-4 sm:py-6 bg-card/50 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-0 sm:justify-around -mx-4 px-4 sm:mx-0 sm:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 shrink-0"
            >
              <feature.icon className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap font-medium">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
