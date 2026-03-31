import { Shield, Truck, MessageCircle, HandCoins, MapPin } from "lucide-react";

const trustItems = [
  { icon: HandCoins, text: "تعاملنا مباشر وواضح" },
  { icon: Truck, text: "نوفر شحن داخل اليمن" },
  { icon: Shield, text: "أسعار مناسبة وجودة مضمونة" },
  { icon: MessageCircle, text: "خدمة عملاء عبر واتساب" },
];

const TrustSection = () => {
  return (
    <section className="py-6 sm:py-8 bg-card/50 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-muted/40"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Cities & COD */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            نشحن إلى: صنعاء – عدن – تعز – إب – الحديدة وجميع المحافظات
          </span>
          <span className="text-border">|</span>
          <span className="text-[#25D366] font-medium">الدفع عند الاستلام متوفر</span>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
