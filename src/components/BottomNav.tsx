import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, ShoppingBag, MessageCircle } from "lucide-react";
import { storeConfig } from "@/config/store";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/categories", label: "الأقسام", icon: Grid3X3 },
  { to: "/products", label: "المنتجات", icon: ShoppingBag },
  { to: "whatsapp", label: "تواصل", icon: MessageCircle },
];

const BottomNav = () => {
  const location = useLocation();

  // Hide on admin page
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const isWhatsApp = item.to === "whatsapp";
          const isActive = !isWhatsApp && location.pathname === item.to;
          const Icon = item.icon;

          if (isWhatsApp) {
            return (
              <a
                key={item.to}
                href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-full text-[#25D366]"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-full transition-colors relative",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-accent" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
