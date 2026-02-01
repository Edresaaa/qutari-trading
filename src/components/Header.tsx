import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { storeConfig } from "@/config/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-chocolate shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-chocolate" />
            </div>
            <div className="text-primary-foreground">
              <h1 className="text-lg md:text-xl font-bold">{storeConfig.name}</h1>
              <p className="text-xs text-gold-light hidden md:block">تسوق بثقة</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-link text-primary-foreground">
              الرئيسية
            </Link>
            <Link to="/products" className="nav-link text-primary-foreground">
              المنتجات
            </Link>
            <Link to="/categories" className="nav-link text-primary-foreground">
              الأقسام
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-gold px-4 py-2 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>لوحة التحكم</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-foreground p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-primary-foreground hover:text-gold px-4 py-3 rounded-lg hover:bg-chocolate-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/products"
                className="text-primary-foreground hover:text-gold px-4 py-3 rounded-lg hover:bg-chocolate-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link
                to="/categories"
                className="text-primary-foreground hover:text-gold px-4 py-3 rounded-lg hover:bg-chocolate-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الأقسام
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 text-gold px-4 py-3 rounded-lg bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
