import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SizeFilter from "@/components/filters/SizeFilter";
import { getProducts, getCategories } from "@/lib/storage";
import { Product, Category } from "@/types/store";
import { ProductSizeType } from "@/types/sizes";
import { Filter, X, Search, Package, ArrowUpDown, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // حالة فلتر المقاسات
  const [selectedSizeType, setSelectedSizeType] = useState<ProductSizeType | "">("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");

  useEffect(() => {
    const loadData = () => {
      setProducts(getProducts());
      setCategories(getCategories());
    };
    
    loadData();
    
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // فلترة المنتجات مع المقاسات
  const filteredProducts = products
    .filter((p) => {
      // فلترة حسب الظهور
      if (p.isVisible === false) return false;
      
      // فلترة حسب القسم
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      
      // فلترة حسب البحث
      const matchesSearch = !searchQuery || 
        p.name.includes(searchQuery) || 
        p.description.includes(searchQuery);
      
      // فلترة حسب نوع المقاس
      const matchesSizeType = !selectedSizeType || p.sizeType === selectedSizeType;
      
      // فلترة حسب المقاس المحدد
      let matchesSize = true;
      if (selectedSize && p.sizeType !== "thobe") {
        matchesSize = p.availableSizes?.includes(selectedSize) || false;
      }
      
      // فلترة حسب الطول والعرض للأثواب
      let matchesLength = true;
      let matchesWidth = true;
      if (selectedSizeType === "thobe") {
        if (selectedLength) {
          matchesLength = p.availableLengths?.includes(selectedLength) || false;
        }
        if (selectedWidth) {
          matchesWidth = p.availableWidths?.includes(selectedWidth) || false;
        }
      }
      
      return matchesCategory && matchesSearch && matchesSizeType && matchesSize && matchesLength && matchesWidth;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name, 'ar');
        case "name-desc":
          return b.name.localeCompare(a.name, 'ar');
        default:
          return 0;
      }
    });

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const newParams: Record<string, string> = {};
    if (slug) newParams.category = slug;
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
    setShowFilters(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newParams: Record<string, string> = {};
    if (selectedCategory) newParams.category = selectedCategory;
    if (query) newParams.search = query;
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedSizeType("");
    setSelectedSize("");
    setSelectedLength("");
    setSelectedWidth("");
    setSearchParams({});
  };

  const clearSizeFilter = () => {
    setSelectedSizeType("");
    setSelectedSize("");
    setSelectedLength("");
    setSelectedWidth("");
  };

  const hasSizeFilter = selectedSizeType || selectedSize || selectedLength || selectedWidth;

  // المنتجات المفلترة حسب القسم فقط (للفلتر الجانبي)
  const productsForSizeFilter = products.filter(p => {
    if (p.isVisible === false) return false;
    if (!selectedCategory) return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              المنتجات
            </h1>
            <p className="text-muted-foreground">
              اكتشف تشكيلتنا المميزة من الشيلان والأزياء التقليدية
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pr-10 py-6 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">الترتيب الافتراضي</SelectItem>
                  <SelectItem value="price-asc">السعر: من الأقل</SelectItem>
                  <SelectItem value="price-desc">السعر: من الأعلى</SelectItem>
                  <SelectItem value="name-asc">الاسم: أ - ي</SelectItem>
                  <SelectItem value="name-desc">الاسم: ي - أ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-4">
              {/* فلتر الأقسام */}
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">الأقسام</h3>
                  {(selectedCategory || searchQuery || hasSizeFilter) && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-destructive hover:underline"
                    >
                      مسح الكل
                    </button>
                  )}
                </div>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange("")}
                      className={`w-full text-right px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      جميع المنتجات
                      <span className="text-sm text-muted-foreground mr-2">
                        ({products.filter(p => p.isVisible !== false).length})
                      </span>
                    </button>
                  </li>
                  {categories.map((category) => {
                    const count = products.filter(p => p.category === category.slug && p.isVisible !== false).length;
                    return (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategoryChange(category.slug)}
                          className={`w-full text-right px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.slug
                              ? "bg-accent text-accent-foreground font-medium"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          {category.name}
                          <span className="text-sm text-muted-foreground mr-2">
                            ({count})
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* فلتر المقاسات */}
              <SizeFilter
                products={productsForSizeFilter}
                selectedSizeType={selectedSizeType}
                selectedSize={selectedSize}
                selectedLength={selectedLength}
                selectedWidth={selectedWidth}
                onSizeTypeChange={setSelectedSizeType}
                onSizeChange={setSelectedSize}
                onLengthChange={setSelectedLength}
                onWidthChange={setSelectedWidth}
                onClearSizeFilter={clearSizeFilter}
              />
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex gap-2 mb-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-card px-4 py-3 rounded-lg shadow-card"
              >
                <Filter className="w-5 h-5" />
                <span>الأقسام</span>
                {selectedCategory && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                  </span>
                )}
              </button>
              {hasSizeFilter && (
                <button
                  onClick={clearSizeFilter}
                  className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-3 rounded-lg"
                >
                  <Ruler className="w-4 h-4" />
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile: Size filter pills */}
            <div className="lg:hidden">
              <SizeFilter
                products={productsForSizeFilter}
                selectedSizeType={selectedSizeType}
                selectedSize={selectedSize}
                selectedLength={selectedLength}
                selectedWidth={selectedWidth}
                onSizeTypeChange={setSelectedSizeType}
                onSizeChange={setSelectedSize}
                onLengthChange={setSelectedLength}
                onWidthChange={setSelectedWidth}
                onClearSizeFilter={clearSizeFilter}
              />
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="fixed inset-0 bg-foreground/50 z-50 lg:hidden">
                <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-background p-6 animate-slide-up">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">الأقسام</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleCategoryChange("")}
                        className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                          !selectedCategory
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        جميع المنتجات
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategoryChange(category.slug)}
                          className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                            selectedCategory === category.slug
                              ? "bg-accent text-accent-foreground font-medium"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <div className="mb-4 text-muted-foreground text-sm flex flex-wrap items-center gap-2">
                <span>{filteredProducts.length} منتج</span>
                {selectedCategory && (
                  <span className="bg-muted px-2 py-1 rounded text-xs">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-muted px-2 py-1 rounded text-xs">
                    "{searchQuery}"
                  </span>
                )}
                {selectedSizeType && (
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Ruler className="w-3 h-3" />
                    {selectedSize || selectedLength || selectedWidth || "مقاس محدد"}
                  </span>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg mb-4">
                    {searchQuery 
                      ? `لا توجد نتائج للبحث "${searchQuery}"`
                      : hasSizeFilter
                      ? "لا توجد منتجات بهذا المقاس"
                      : "لا توجد منتجات في هذا القسم حالياً"
                    }
                  </p>
                  {(searchQuery || selectedCategory || hasSizeFilter) && (
                    <button
                      onClick={clearFilters}
                      className="text-accent hover:underline"
                    >
                      عرض جميع المنتجات
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
