import { Truck, Shield, MessageCircle, HandCoins, Clock } from "lucide-react";

const features = [
  { icon: MessageCircle, title: "طلب سهل عبر واتساب" },
  { icon: Truck, title: "شحن لكل اليمن" },
  { icon: Shield, title: "جودة مضمونة" },
  { icon: HandCoins, title: "الدفع عند الاستلام" },
  { icon: Clock, title: "رد سريع" },
];

const FeaturesSection = () => {
  return (
    <section className="py-3 sm:py-4 bg-[#25D366]/5 border-y border-[#25D366]/10">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-0 sm:justify-around -mx-4 px-4 sm:mx-0 sm:px-0">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 shrink-0">
              <feature.icon className="w-4 h-4 text-[#25D366] shrink-0" />
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
