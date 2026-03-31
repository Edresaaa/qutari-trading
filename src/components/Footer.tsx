import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Settings } from "lucide-react";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import Logo from "./Logo";

const Footer = () => {
  const settings = useStoreSettings();

  return (
    <footer className="bg-primary border-t border-border/50 pb-20 lg:pb-0">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo size="md" variant="full" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {settings.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-foreground">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "الرئيسية" },
                { to: "/products", label: "المنتجات" },
                { to: "/categories", label: "الأقسام" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-foreground">الأقسام</h4>
            <ul className="space-y-2.5">
              {[
                { slug: "thobes", name: "ثياب" },
                { slug: "ghutras", name: "غتر" },
                { slug: "shawls", name: "شيلان" },
                { slug: "maawiz", name: "معاوز" },
                { slug: "rings", name: "خواتم" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-muted-foreground hover:text-accent text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm mb-4 text-foreground">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <div className="flex flex-col">
                  {settings.phones?.map((phone, i) => (
                    <a key={i} href={`tel:${phone}`} className="text-sm text-muted-foreground hover:text-accent transition-colors" dir="ltr">
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  واتساب
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {settings.storeName}
          </p>
          <Link
            to="/admin"
            className="w-7 h-7 rounded-lg bg-muted/50 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all text-muted-foreground"
          >
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
