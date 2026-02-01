import { Link } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="leather-bg text-primary-foreground relative">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <Logo size="md" variant="full" />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              متجر متخصص في بيع أفخر أنواع الغتر والأشمغة الكشميرية والشيلان الباشمينا بجودة عالية وأسعار مناسبة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary-foreground border-b border-primary-foreground/20 pb-2">روابط سريعة</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  الأقسام
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  لوحة التحكم
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary-foreground border-b border-primary-foreground/20 pb-2">الأقسام</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products?category=kashmiri-vip" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  غتر كشميري VIP
                </Link>
              </li>
              <li>
                <Link to="/products?category=pashmina-royal" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  شيلان باشمينا ملكي
                </Link>
              </li>
              <li>
                <Link to="/products?category=winter-shemagh" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  أشمغة شتوية
                </Link>
              </li>
              <li>
                <Link to="/products?category=classic-shemagh" className="text-primary-foreground/80 hover:text-primary-foreground hover:pr-2 transition-all duration-300">
                  أشمغة كلاسيكية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary-foreground border-b border-primary-foreground/20 pb-2">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">أرقام الهاتف</p>
                  <div className="flex flex-col gap-1">
                    {storeConfig.phones?.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`} 
                        className="text-primary-foreground hover:text-primary-foreground/80 transition-colors text-sm" 
                        dir="ltr"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">واتساب</p>
                  <a 
                    href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                  >
                    تواصل معنا
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">الموقع</p>
                  <span className="text-primary-foreground">{storeConfig.address || "اليمن - صنعاء"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {storeConfig.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/60 text-sm">طرق الدفع:</span>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-primary-foreground/10 rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                نقداً
              </div>
              <div className="px-3 py-1 bg-primary-foreground/10 rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                تحويل
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
