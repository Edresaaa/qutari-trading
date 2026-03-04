import { Link } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Twitter, Settings } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 sm:mb-6">
              <Logo size="md" variant="full" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              متجر متخصص في بيع أفخر أنواع الغتر والأشمغة الكشميرية والشيلان الباشمينا.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-foreground relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 sm:w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  الأقسام
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="hidden md:block">
            <h4 className="font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-foreground relative inline-block">
              الأقسام
              <span className="absolute -bottom-2 right-0 w-8 sm:w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link to="/products?category=kashmiri-vip" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  غتر كشميري VIP
                </Link>
              </li>
              <li>
                <Link to="/products?category=pashmina-royal" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  شيلان باشمينا ملكي
                </Link>
              </li>
              <li>
                <Link to="/products?category=winter-shemagh" className="text-muted-foreground hover:text-accent hover:pr-2 transition-all duration-300 text-sm">
                  أشمغة شتوية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-foreground relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-8 sm:w-10 h-0.5 bg-gradient-to-l from-accent to-transparent rounded-full" />
            </h4>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">أرقام الهاتف</p>
                  <div className="flex flex-col gap-0.5">
                    {storeConfig.phones?.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`} 
                        className="text-foreground hover:text-accent transition-colors text-xs sm:text-sm" 
                        dir="ltr"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">واتساب</p>
                  <a 
                    href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors text-sm"
                  >
                    تواصل معنا
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">الموقع</p>
                  <span className="text-foreground text-sm">{storeConfig.address || "اليمن - صنعاء"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {storeConfig.name}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-muted-foreground text-xs sm:text-sm">طرق الدفع:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-medium text-foreground">
                  نقداً
                </div>
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-medium text-foreground">
                  تحويل
                </div>
              </div>
            </div>
            <div className="h-5 sm:h-6 w-px bg-border" />
            <Link
              to="/admin"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-muted-foreground"
              title="لوحة التحكم"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
