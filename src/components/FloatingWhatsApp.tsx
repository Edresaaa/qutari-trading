import { MessageCircle } from "lucide-react";
import { storeConfig } from "@/config/store";
import { useLocation } from "react-router-dom";

const FloatingWhatsApp = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;

  const waLink = `https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("مرحباً، معكم من القوطاري للتجارة\nأرغب في الاستفسار عن المنتجات المتوفرة لديكم")}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-20 lg:bottom-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group"
      aria-label="راسلنا على واتساب"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-bold whitespace-nowrap">راسلنا الآن</span>
    </a>
  );
};

export default FloatingWhatsApp;
