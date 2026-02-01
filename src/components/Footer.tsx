import { Link } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { MessageCircle, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-chocolate text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">{storeConfig.name}</h3>
            <p className="text-primary-foreground/70 mb-4">
              {storeConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gold">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  الأقسام
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gold">تواصل معنا</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-gold" />
                <span dir="ltr">{storeConfig.whatsappNumber}</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-gold" />
                <span>اليمن</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-chocolate-light mt-8 pt-8 text-center text-primary-foreground/50">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {storeConfig.name}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
