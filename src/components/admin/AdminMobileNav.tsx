import {
  LayoutDashboard,
  ShoppingBag,
  FolderOpen,
  Layout,
  Star,
  Tag,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AdminMobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
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

const AdminMobileNav = ({ activeTab, onTabChange, onLogout }: AdminMobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = menuItems.find(m => m.id === activeTab);
  const ActiveIcon = activeItem?.icon || LayoutDashboard;

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <ActiveIcon className="w-5 h-5 text-accent" />
          <span className="font-bold text-foreground">{activeItem?.label}</span>
        </div>
        <Button size="sm" variant="ghost" onClick={onLogout} className="text-destructive">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 right-0 w-72 bg-card border-l border-border z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-foreground">القائمة</h3>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onTabChange(item.id); setIsOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-accent/15 text-accent border border-accent/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive && "text-accent")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminMobileNav;
