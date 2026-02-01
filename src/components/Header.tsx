import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { Menu, X, Phone, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-md shadow-lg" 
          : "bg-card"
      }`}
    >
      {/* Top bar with leather texture */}
      <div className="bg-primary leather-texture py-2 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between text-primary-foreground text-sm">
          <span>أهلاً بك في متجر القوطاري للتجارة</span>
          <a 
            href={`tel:${storeConfig.whatsappNumber}`}
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span dir="ltr">{storeConfig.whatsappNumber}</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <Logo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/">الرئيسية</NavLink>
            <NavLink to="/products">المنتجات</NavLink>
            <NavLink to="/categories">الأقسام</NavLink>
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>لوحة التحكم</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full hover:bg-[#20bd5a] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>تواصل معنا</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-card shadow-xl transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <NavLink to="/" className="py-3 px-4 rounded-lg hover:bg-muted">الرئيسية</NavLink>
          <NavLink to="/products" className="py-3 px-4 rounded-lg hover:bg-muted">المنتجات</NavLink>
          <NavLink to="/categories" className="py-3 px-4 rounded-lg hover:bg-muted">الأقسام</NavLink>
          <Link
            to="/admin"
            className="flex items-center gap-2 py-3 px-4 rounded-lg bg-accent/10 text-accent"
          >
            <Settings className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-lg font-medium mt-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>تواصل معنا</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
