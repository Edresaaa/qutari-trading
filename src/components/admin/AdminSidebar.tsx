import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  FolderOpen,
  Layout,
  Star,
  Tag,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  stats: {
    products: number;
    categories: number;
    banners: number;
    featured: number;
  };
}

const menuItems = [
  { id: "dashboard", label: "لوحة القيادة", icon: LayoutDashboard },
  { id: "products", label: "المنتجات", icon: ShoppingBag },
  { id: "categories", label: "الأقسام", icon: FolderOpen },
  { id: "banners", label: "البنرات", icon: Layout },
  { id: "reviews", label: "التقييمات", icon: Star },
  { id: "offers", label: "العروض", icon: Tag },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

const AdminSidebar = ({ activeTab, onTabChange, onLogout, stats }: AdminSidebarProps) => {
  return (
    <aside className="w-72 bg-card border-l border-border min-h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="sm" variant="full" />
        </Link>
        <p className="text-xs text-muted-foreground mt-2">لوحة التحكم الإدارية</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent/15 text-accent border border-accent/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-accent")} />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 mr-auto text-accent" />}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-muted/50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-foreground">{stats.products}</p>
            <p className="text-[10px] text-muted-foreground">منتج</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-foreground">{stats.categories}</p>
            <p className="text-[10px] text-muted-foreground">قسم</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
