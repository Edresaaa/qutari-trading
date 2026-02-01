import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/storage";
import { Product, Category } from "@/types/store";
import { Filter, X } from "lucide-react";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
    setShowFilters(false);
  };

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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                <h3 className="font-bold text-foreground mb-4">الأقسام</h3>
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
                    </button>
                  </li>
                  {categories.map((category) => (
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
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 bg-card px-4 py-3 rounded-lg shadow-card mb-4"
            >
              <Filter className="w-5 h-5" />
              <span>تصفية حسب القسم</span>
              {selectedCategory && (
                <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
              )}
            </button>

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
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    لا توجد منتجات في هذا القسم حالياً
                  </p>
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
