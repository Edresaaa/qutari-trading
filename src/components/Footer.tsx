import { Link } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Twitter, Settings } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <Logo size="md" variant="full" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              متجر متخصص في بيع أفخر أنواع الغتر والأشمغة الكشميرية والشيلان الباشمينا بجودة عالية وأسعار مناسبة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  الأقسام
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              الأقسام
              <span className="absolute -bottom-2 right-0 w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products?category=kashmiri-vip" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  غتر كشميري VIP
                </Link>
              </li>
              <li>
                <Link to="/products?category=pashmina-royal" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  شيلان باشمينا ملكي
                </Link>
              </li>
              <li>
                <Link to="/products?category=winter-shemagh" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  أشمغة شتوية
                </Link>
              </li>
              <li>
                <Link to="/products?category=classic-shemagh" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300">
                  أشمغة كلاسيكية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">أرقام الهاتف</p>
                  <div className="flex flex-col gap-1">
                    {storeConfig.phones?.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`} 
                        className="text-foreground hover:text-accent transition-colors text-sm" 
                        dir="ltr"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">واتساب</p>
                  <a 
                    href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    تواصل معنا
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الموقع</p>
                  <span className="text-foreground">{storeConfig.address || "اليمن - صنعاء"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {storeConfig.name}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">طرق الدفع:</span>
              <div className="flex gap-2">
                <div className="px-4 py-1.5 bg-secondary rounded-lg flex items-center justify-center text-xs font-medium text-foreground">
                  نقداً
                </div>
                <div className="px-4 py-1.5 bg-secondary rounded-lg flex items-center justify-center text-xs font-medium text-foreground">
                  تحويل
                </div>
              </div>
            </div>
            <div className="h-6 w-px bg-border hidden md:block" />
            <Link
              to="/admin"
              className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground"
              title="لوحة التحكم"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
