import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { storeConfig } from "@/config/store";
import { Search, X, Phone } from "lucide-react";
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
                className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-xl hover:bg-[#20bd5a] transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل معنا
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
