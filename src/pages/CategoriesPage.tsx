import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import SEOHead from "@/components/SEOHead";
import { getCategories } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Category } from "@/types/store";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="الأقسام"
        description="تصفح جميع أقسام متجر القوطاري للتجاره – ثياب، شيلان، غتر، كوافي، معاوز، فوط، خواتم وأكثر. اطلب عبر واتساب."
        path="/categories"
      />
      <Header />

      <main className="flex-1 py-6 sm:py-8 pb-20 lg:pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">الأقسام</h1>
            <p className="text-muted-foreground text-sm">تصفح أقسامنا المتنوعة</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
