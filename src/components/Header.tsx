import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { Search, X, Phone, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { getCategories } from "@/lib/storage";
import { Category } from "@/types/store";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(getCategories());
    const handler = () => setCategories(getCategories());
    window.addEventListener('productsUpdated', handler);
    return () => window.removeEventListener('productsUpdated', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowSearch(false);
    setSearchQuery("");
  }, [location]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  }, [searchQuery, navigate]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/98 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-card border-b border-border/30"
        }`}
      >
        {/* Top info bar - desktop only */}
        <div className="hidden md:block bg-primary/80 border-b border-border/20">
          <div className="container mx-auto px-4 flex items-center justify-between h-8 text-xs">
            <span className="text-muted-foreground">مرحباً بك في {storeConfig.name}</span>
            <a
              href={`tel:${storeConfig.whatsappNumber}`}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span dir="ltr">{storeConfig.whatsappNumber}</span>
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <Logo size="md" variant="full" />
            </Link>

            {/* Desktop: Category links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/products"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === "/products" && !new URLSearchParams(location.search).get("category")
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                الكل
              </Link>
              {categories.slice(0, 7).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    new URLSearchParams(location.search).get("category") === cat.slug
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* WhatsApp - desktop */}
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-xl hover:bg-[#20bd5a] transition-all text-sm font-bold active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                راسلنا الآن
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Categories scroll strip */}
        <div className="lg:hidden border-t border-border/30 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 px-4 py-2">
            <Link
              to="/products"
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                location.pathname === "/products" && !new URLSearchParams(location.search).get("category")
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted/60 text-muted-foreground"
              }`}
            >
              الكل
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  new URLSearchParams(location.search).get("category") === cat.slug
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted/60 text-muted-foreground"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border/30 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="container mx-auto px-4 py-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن منتج..."
                    className="w-full bg-muted/50 border border-border rounded-xl pr-10 pl-10 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
