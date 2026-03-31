import { MessageCircle, ArrowLeft } from "lucide-react";
import { storeConfig } from "@/config/store";

const ReassuranceSection = () => {
  const waLink = `https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("مرحباً، معكم من القوطاري للتجارة\nعندي استفسار قبل الطلب")}`;

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-muted/40 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
            عندك سؤال؟ لا تتردد!
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-muted-foreground">✅ الرد سريع على جميع الاستفسارات</p>
            <p className="text-sm text-muted-foreground">✅ يمكنك السؤال قبل الشراء</p>
            <p className="text-sm text-muted-foreground">✅ نوضح لك كل التفاصيل قبل الطلب</p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            اسألنا عبر واتساب
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReassuranceSection;
