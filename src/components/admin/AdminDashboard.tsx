import { ShoppingBag, FolderOpen, Layout, Package, Star, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Product, Category } from "@/types/store";
import { Banner } from "@/lib/storage";

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  onNavigate: (tab: string) => void;
}

const AdminDashboard = ({ products, categories, banners, onNavigate }: AdminDashboardProps) => {
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock || (p.quantity !== undefined && p.quantity === 0)).length;
  const featuredCount = products.filter(p => p.featured).length;
  const hiddenCount = products.filter(p => p.isVisible === false).length;
  const activeBanners = banners.filter(b => b.isActive).length;

  const stats = [
    { label: "إجمالي المنتجات", value: products.length, icon: ShoppingBag, color: "text-accent", bg: "bg-accent/10", tab: "products" },
    { label: "الأقسام", value: categories.length, icon: FolderOpen, color: "text-primary-foreground", bg: "bg-primary", tab: "categories" },
    { label: "البنرات النشطة", value: `${activeBanners}/${banners.length}`, icon: Layout, color: "text-gold", bg: "bg-gold/10", tab: "banners" },
    { label: "المنتجات المميزة", value: featuredCount, icon: Star, color: "text-gold", bg: "bg-gold/10", tab: "products" },
  ];

  const quickInfo = [
    { label: "متوفر", value: inStockCount, color: "text-green-400", icon: TrendingUp },
    { label: "غير متوفر", value: outOfStockCount, color: "text-destructive", icon: Package },
    { label: "مخفي", value: hiddenCount, color: "text-muted-foreground", icon: EyeOff },
    { label: "ظاهر", value: products.length - hiddenCount, color: "text-accent", icon: Eye },
  ];

  // Top categories by product count
  const categoryStats = categories.map(cat => ({
    name: cat.name,
    count: products.filter(p => p.category === cat.slug).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">مرحباً بك في لوحة التحكم</h1>
        <p className="text-muted-foreground mt-1">نظرة عامة على متجرك</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(stat.tab)}
              className="bg-card rounded-2xl p-5 border border-border hover:border-accent/30 transition-all duration-300 text-right group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Quick Info + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Status */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-foreground mb-4">حالة المنتجات</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="bg-muted/50 rounded-xl p-4 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${info.color}`} />
                  <div>
                    <p className={`text-xl font-bold ${info.color}`}>{info.value}</p>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-foreground mb-4">توزيع المنتجات حسب القسم</h3>
          <div className="space-y-3">
            {categoryStats.slice(0, 5).map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{cat.name}</span>
                    <span className="text-sm text-muted-foreground">{cat.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-accent to-gold"
                      style={{ width: `${products.length > 0 ? (cat.count / products.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
