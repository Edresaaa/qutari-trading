import { Link } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
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
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">روابط سريعة</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  الأقسام
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  لوحة التحكم
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">الأقسام</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products?category=kashmiri-vip" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  غتر كشميري VIP
                </Link>
              </li>
              <li>
                <Link to="/products?category=pashmina-royal" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  شيلان باشمينا ملكي
                </Link>
              </li>
              <li>
                <Link to="/products?category=winter-shemagh" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  أشمغة شتوية
                </Link>
              </li>
              <li>
                <Link to="/products?category=classic-shemagh" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  أشمغة كلاسيكية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">أرقام الهاتف</p>
                  <div className="flex flex-col gap-1">
                    {storeConfig.phones?.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`} 
                        className="text-primary-foreground hover:text-gold transition-colors text-sm" 
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
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">واتساب</p>
                  <a 
                    href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground hover:text-gold transition-colors"
                  >
                    تواصل معنا
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
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
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {storeConfig.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/60 text-sm">طرق الدفع:</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-primary-foreground/10 rounded flex items-center justify-center text-xs font-bold">
                نقداً
              </div>
              <div className="w-10 h-6 bg-primary-foreground/10 rounded flex items-center justify-center text-xs font-bold">
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
