import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  updateCategory,
  deleteCategory,
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  getStoreSettings,
  saveStoreSettings,
  Banner,
  StoreSettings,
} from "@/lib/storage";
import { uploadProductImage, uploadCategoryImage } from "@/lib/imageUpload";
import { Product, Category } from "@/types/store";
import { 
  Plus, Pencil, Trash2, ArrowRight, Package, Lock, Eye, EyeOff,
  FolderOpen, ShoppingBag, Search, Upload, Loader2, Image, 
  Layout, Settings, X, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ADMIN_PASSWORD = "QR@X512512x";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  quantity: string;
  isVisible: boolean;
}

interface CategoryFormData {
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface BannerFormData {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  isActive: boolean;
}

const initialProductFormData: ProductFormData = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  image: "",
  category: "",
  inStock: true,
  featured: false,
  quantity: "",
  isVisible: true,
};

const initialCategoryFormData: CategoryFormData = {
  name: "",
  slug: "",
  image: "",
  description: "",
};

const initialBannerFormData: BannerFormData = {
  image: "",
  title: "",
  subtitle: "",
  link: "",
  isActive: true,
};

const AdminPage = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Product form state
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductConfirm, setDeleteProductConfirm] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState<ProductFormData>(initialProductFormData);
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // Category form state
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategoryConfirm, setDeleteCategoryConfirm] = useState<string | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>(initialCategoryFormData);
  const [isUploadingCategoryImage, setIsUploadingCategoryImage] = useState(false);
  const categoryImageInputRef = useRef<HTMLInputElement>(null);

  // Banner form state
  const [isBannerFormOpen, setIsBannerFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deleteBannerConfirm, setDeleteBannerConfirm] = useState<string | null>(null);
  const [bannerFormData, setBannerFormData] = useState<BannerFormData>(initialBannerFormData);
  const [isUploadingBannerImage, setIsUploadingBannerImage] = useState(false);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin_authenticated");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
    setBanners(getBanners());
    setStoreSettings(getStoreSettings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setLoginError("");
      loadData();
    } else {
      setLoginError("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  // Image upload handlers
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProductImage(true);
    try {
      const url = await uploadProductImage(file);
      if (url) {
        setProductFormData({ ...productFormData, image: url });
        toast({ title: "تم الرفع", description: "تم رفع الصورة بنجاح" });
      }
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء رفع الصورة", variant: "destructive" });
    } finally {
      setIsUploadingProductImage(false);
    }
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCategoryImage(true);
    try {
      const url = await uploadCategoryImage(file);
      if (url) {
        setCategoryFormData({ ...categoryFormData, image: url });
        toast({ title: "تم الرفع", description: "تم رفع الصورة بنجاح" });
      }
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء رفع الصورة", variant: "destructive" });
    } finally {
      setIsUploadingCategoryImage(false);
    }
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBannerImage(true);
    try {
      const url = await uploadProductImage(file);
      if (url) {
        setBannerFormData({ ...bannerFormData, image: url });
        toast({ title: "تم الرفع", description: "تم رفع الصورة بنجاح" });
      }
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء رفع الصورة", variant: "destructive" });
    } finally {
      setIsUploadingBannerImage(false);
    }
  };

  // Product functions
  const handleOpenProductForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        featured: product.featured || false,
        quantity: product.quantity?.toString() || "",
        isVisible: product.isVisible !== false,
      });
    } else {
      setEditingProduct(null);
      setProductFormData(initialProductFormData);
    }
    setIsProductFormOpen(true);
  };

  const handleCloseProductForm = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
    setProductFormData(initialProductFormData);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = productFormData.quantity ? parseInt(productFormData.quantity) : undefined;
    const productData = {
      name: productFormData.name,
      description: productFormData.description,
      price: parseFloat(productFormData.price),
      originalPrice: productFormData.originalPrice ? parseFloat(productFormData.originalPrice) : undefined,
      image: productFormData.image,
      category: productFormData.category,
      inStock: quantity !== undefined ? quantity > 0 : productFormData.inStock,
      featured: productFormData.featured,
      quantity: quantity,
      isVisible: productFormData.isVisible,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({ title: "تم التحديث", description: "تم تحديث المنتج بنجاح" });
    } else {
      addProduct(productData);
      toast({ title: "تمت الإضافة", description: "تم إضافة المنتج بنجاح" });
    }
    loadData();
    handleCloseProductForm();
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    loadData();
    setDeleteProductConfirm(null);
    toast({ title: "تم الحذف", description: "تم حذف المنتج بنجاح", variant: "destructive" });
  };

  // Category functions
  const handleOpenCategoryForm = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        slug: category.slug,
        image: category.image,
        description: category.description || "",
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData(initialCategoryFormData);
    }
    setIsCategoryFormOpen(true);
  };

  const handleCloseCategoryForm = () => {
    setIsCategoryFormOpen(false);
    setEditingCategory(null);
    setCategoryFormData(initialCategoryFormData);
  };

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name: categoryFormData.name,
      slug: categoryFormData.slug || categoryFormData.name.toLowerCase().replace(/\s+/g, '-'),
      image: categoryFormData.image,
      description: categoryFormData.description,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
      toast({ title: "تم التحديث", description: "تم تحديث القسم بنجاح" });
    } else {
      addCategory(categoryData);
      toast({ title: "تمت الإضافة", description: "تم إضافة القسم بنجاح" });
    }
    loadData();
    handleCloseCategoryForm();
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
    loadData();
    setDeleteCategoryConfirm(null);
    toast({ title: "تم الحذف", description: "تم حذف القسم بنجاح", variant: "destructive" });
  };

  // Banner functions
  const handleOpenBannerForm = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setBannerFormData({
        image: banner.image,
        title: banner.title,
        subtitle: banner.subtitle,
        link: banner.link,
        isActive: banner.isActive,
      });
    } else {
      setEditingBanner(null);
      setBannerFormData(initialBannerFormData);
    }
    setIsBannerFormOpen(true);
  };

  const handleCloseBannerForm = () => {
    setIsBannerFormOpen(false);
    setEditingBanner(null);
    setBannerFormData(initialBannerFormData);
  };

  const handleSubmitBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const bannerData = {
      image: bannerFormData.image,
      title: bannerFormData.title,
      subtitle: bannerFormData.subtitle,
      link: bannerFormData.link,
      isActive: bannerFormData.isActive,
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, bannerData);
      toast({ title: "تم التحديث", description: "تم تحديث البنر بنجاح" });
    } else {
      addBanner(bannerData);
      toast({ title: "تمت الإضافة", description: "تم إضافة البنر بنجاح" });
    }
    loadData();
    handleCloseBannerForm();
  };

  const handleDeleteBanner = (id: string) => {
    deleteBanner(id);
    loadData();
    setDeleteBannerConfirm(null);
    toast({ title: "تم الحذف", description: "تم حذف البنر بنجاح", variant: "destructive" });
  };

  const handleToggleBannerActive = (banner: Banner) => {
    updateBanner(banner.id, { isActive: !banner.isActive });
    loadData();
    toast({ 
      title: banner.isActive ? "تم إلغاء التفعيل" : "تم التفعيل", 
      description: banner.isActive ? "تم إخفاء البنر" : "تم إظهار البنر" 
    });
  };

  // Store settings functions
  const handleSaveSettings = () => {
    if (storeSettings) {
      saveStoreSettings(storeSettings);
      toast({ title: "تم الحفظ", description: "تم حفظ الإعدادات بنجاح" });
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(product =>
    product.name.includes(searchQuery) || product.description.includes(searchQuery)
  );

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="w-full max-w-md px-4">
            <div className="bg-card rounded-2xl shadow-card p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center mb-4">
                  <Lock className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
                <p className="text-muted-foreground mt-2">أدخل كلمة المرور للوصول</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    className="pl-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginError && <p className="text-destructive text-sm text-center">{loginError}</p>}
                <Button type="submit" className="btn-gold w-full">دخول</Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Link to="/" className="hover:text-accent">الرئيسية</Link>
                <ArrowRight className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              تسجيل الخروج
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{products.length}</p>
                  <p className="text-sm text-muted-foreground">منتج</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">قسم</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{banners.length}</p>
                  <p className="text-sm text-muted-foreground">بنر</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{products.filter(p => p.featured).length}</p>
                  <p className="text-sm text-muted-foreground">مميز</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">المنتجات</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">الأقسام</span>
              </TabsTrigger>
              <TabsTrigger value="banners" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">البنرات</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">الإعدادات</span>
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في المنتجات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button onClick={() => handleOpenProductForm()} className="btn-gold">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة منتج
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-right px-4 py-3 font-bold text-foreground">المنتج</th>
                        <th className="text-right px-4 py-3 font-bold text-foreground hidden md:table-cell">القسم</th>
                        <th className="text-right px-4 py-3 font-bold text-foreground">السعر</th>
                        <th className="text-right px-4 py-3 font-bold text-foreground hidden sm:table-cell">الحالة</th>
                        <th className="text-right px-4 py-3 font-bold text-foreground">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                                {product.featured && <span className="text-xs text-gold">مميز</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-sm text-muted-foreground">
                              {categories.find(c => c.slug === product.category)?.name || product.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-accent">{product.price} ر.ي</span>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.inStock ? 'متوفر' : 'نفذ'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" onClick={() => handleOpenProductForm(product)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteProductConfirm(product.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-bold text-lg">الأقسام ({categories.length})</h3>
                  <Button onClick={() => handleOpenCategoryForm()} className="btn-gold">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة قسم
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-muted rounded-xl overflow-hidden">
                      <div className="aspect-video relative">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <h4 className="absolute bottom-3 right-3 text-white font-bold text-lg">{category.name}</h4>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category.slug}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleOpenCategoryForm(category)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteCategoryConfirm(category.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Banners Tab */}
            <TabsContent value="banners">
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-bold text-lg">البنرات ({banners.length})</h3>
                  <Button onClick={() => handleOpenBannerForm()} className="btn-gold">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة بنر
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                  {banners.map((banner) => (
                    <div key={banner.id} className={`bg-muted rounded-xl overflow-hidden ${!banner.isActive ? 'opacity-60' : ''}`}>
                      <div className="aspect-[21/9] relative">
                        <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                        <div className="absolute bottom-4 right-4 text-white">
                          <h4 className="font-bold text-xl">{banner.title}</h4>
                          <p className="text-sm opacity-80">{banner.subtitle}</p>
                        </div>
                        {!banner.isActive && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            مخفي
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Switch checked={banner.isActive} onCheckedChange={() => handleToggleBannerActive(banner)} />
                          <span className="text-sm text-muted-foreground">{banner.isActive ? 'مفعّل' : 'معطّل'}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleOpenBannerForm(banner)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteBannerConfirm(banner.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              {storeSettings && (
                <div className="bg-card rounded-xl shadow-card p-6">
                  <h3 className="font-bold text-xl mb-6 border-b border-border pb-4">إعدادات المتجر</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>اسم المتجر</Label>
                        <Input
                          value={storeSettings.storeName}
                          onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>رقم الواتساب</Label>
                        <Input
                          value={storeSettings.whatsappNumber}
                          onChange={(e) => setStoreSettings({ ...storeSettings, whatsappNumber: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label>العنوان</Label>
                        <Input
                          value={storeSettings.address}
                          onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>الوصف</Label>
                        <Textarea
                          value={storeSettings.description}
                          onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>أرقام الهواتف (واحد في كل سطر)</Label>
                        <Textarea
                          value={storeSettings.phones.join('\n')}
                          onChange={(e) => setStoreSettings({ ...storeSettings, phones: e.target.value.split('\n').filter(p => p.trim()) })}
                          rows={3}
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label>رابط فيسبوك</Label>
                        <Input
                          value={storeSettings.socialLinks.facebook || ''}
                          onChange={(e) => setStoreSettings({ ...storeSettings, socialLinks: { ...storeSettings.socialLinks, facebook: e.target.value } })}
                          dir="ltr"
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <Label>رابط انستجرام</Label>
                        <Input
                          value={storeSettings.socialLinks.instagram || ''}
                          onChange={(e) => setStoreSettings({ ...storeSettings, socialLinks: { ...storeSettings.socialLinks, instagram: e.target.value } })}
                          dir="ltr"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <Label>رابط تويتر</Label>
                        <Input
                          value={storeSettings.socialLinks.twitter || ''}
                          onChange={(e) => setStoreSettings({ ...storeSettings, socialLinks: { ...storeSettings.socialLinks, twitter: e.target.value } })}
                          dir="ltr"
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button onClick={handleSaveSettings} className="btn-gold">
                      <Check className="w-5 h-5 ml-2" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Product Form Dialog */}
      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>اسم المنتج *</Label>
                <Input value={productFormData.name} onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })} required />
              </div>
              <div className="md:col-span-2">
                <Label>الوصف *</Label>
                <Textarea value={productFormData.description} onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })} required />
              </div>
              <div>
                <Label>السعر *</Label>
                <Input type="number" value={productFormData.price} onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })} required />
              </div>
              <div>
                <Label>السعر الأصلي (اختياري)</Label>
                <Input type="number" value={productFormData.originalPrice} onChange={(e) => setProductFormData({ ...productFormData, originalPrice: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>صورة المنتج</Label>
                <div className="flex gap-2">
                  <Input value={productFormData.image} onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })} placeholder="رابط الصورة أو ارفع صورة" />
                  <input type="file" ref={productImageInputRef} onChange={handleProductImageUpload} accept="image/*" className="hidden" />
                  <Button type="button" variant="outline" onClick={() => productImageInputRef.current?.click()} disabled={isUploadingProductImage}>
                    {isUploadingProductImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                </div>
                {productFormData.image && <img src={productFormData.image} alt="preview" className="mt-2 h-20 rounded" />}
              </div>
              <div>
                <Label>القسم *</Label>
                <Select value={productFormData.category} onValueChange={(v) => setProductFormData({ ...productFormData, category: v })}>
                  <SelectTrigger><SelectValue placeholder="اختر القسم" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>الكمية</Label>
                <Input 
                  type="number" 
                  min="0"
                  value={productFormData.quantity} 
                  onChange={(e) => setProductFormData({ ...productFormData, quantity: e.target.value })} 
                  placeholder="اتركه فارغاً للكمية غير المحدودة"
                />
                <p className="text-xs text-muted-foreground mt-1">عند الكمية = 0 سيظهر "غير متوفر" للعميل</p>
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={productFormData.inStock} onCheckedChange={(c) => setProductFormData({ ...productFormData, inStock: c })} />
                  <Label>متوفر</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={productFormData.featured} onCheckedChange={(c) => setProductFormData({ ...productFormData, featured: c })} />
                  <Label>مميز</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={productFormData.isVisible} onCheckedChange={(c) => setProductFormData({ ...productFormData, isVisible: c })} />
                  <Label>ظاهر للعملاء</Label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCloseProductForm}>إلغاء</Button>
              <Button type="submit" className="btn-gold">{editingProduct ? 'تحديث' : 'إضافة'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Form Dialog */}
      <Dialog open={isCategoryFormOpen} onOpenChange={setIsCategoryFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitCategory} className="space-y-4">
            <div>
              <Label>اسم القسم *</Label>
              <Input value={categoryFormData.name} onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })} required />
            </div>
            <div>
              <Label>المعرف (slug)</Label>
              <Input value={categoryFormData.slug} onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })} dir="ltr" placeholder="يتم إنشاؤه تلقائياً" />
            </div>
            <div>
              <Label>صورة القسم</Label>
              <div className="flex gap-2">
                <Input value={categoryFormData.image} onChange={(e) => setCategoryFormData({ ...categoryFormData, image: e.target.value })} placeholder="رابط الصورة" />
                <input type="file" ref={categoryImageInputRef} onChange={handleCategoryImageUpload} accept="image/*" className="hidden" />
                <Button type="button" variant="outline" onClick={() => categoryImageInputRef.current?.click()} disabled={isUploadingCategoryImage}>
                  {isUploadingCategoryImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                </Button>
              </div>
              {categoryFormData.image && <img src={categoryFormData.image} alt="preview" className="mt-2 h-20 rounded" />}
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea value={categoryFormData.description} onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCloseCategoryForm}>إلغاء</Button>
              <Button type="submit" className="btn-gold">{editingCategory ? 'تحديث' : 'إضافة'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Banner Form Dialog */}
      <Dialog open={isBannerFormOpen} onOpenChange={setIsBannerFormOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingBanner ? 'تعديل البنر' : 'إضافة بنر جديد'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitBanner} className="space-y-4">
            <div>
              <Label>صورة البنر *</Label>
              <div className="flex gap-2">
                <Input value={bannerFormData.image} onChange={(e) => setBannerFormData({ ...bannerFormData, image: e.target.value })} placeholder="رابط الصورة" required />
                <input type="file" ref={bannerImageInputRef} onChange={handleBannerImageUpload} accept="image/*" className="hidden" />
                <Button type="button" variant="outline" onClick={() => bannerImageInputRef.current?.click()} disabled={isUploadingBannerImage}>
                  {isUploadingBannerImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                </Button>
              </div>
              {bannerFormData.image && <img src={bannerFormData.image} alt="preview" className="mt-2 h-24 rounded w-full object-cover" />}
            </div>
            <div>
              <Label>العنوان *</Label>
              <Input value={bannerFormData.title} onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })} required />
            </div>
            <div>
              <Label>العنوان الفرعي</Label>
              <Input value={bannerFormData.subtitle} onChange={(e) => setBannerFormData({ ...bannerFormData, subtitle: e.target.value })} />
            </div>
            <div>
              <Label>الرابط *</Label>
              <Input value={bannerFormData.link} onChange={(e) => setBannerFormData({ ...bannerFormData, link: e.target.value })} dir="ltr" placeholder="/products" required />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={bannerFormData.isActive} onCheckedChange={(c) => setBannerFormData({ ...bannerFormData, isActive: c })} />
              <Label>مفعّل</Label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCloseBannerForm}>إلغاء</Button>
              <Button type="submit" className="btn-gold">{editingBanner ? 'تحديث' : 'إضافة'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmations */}
      <AlertDialog open={!!deleteProductConfirm} onOpenChange={() => setDeleteProductConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف هذا المنتج نهائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteProductConfirm && handleDeleteProduct(deleteProductConfirm)} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteCategoryConfirm} onOpenChange={() => setDeleteCategoryConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف هذا القسم نهائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCategoryConfirm && handleDeleteCategory(deleteCategoryConfirm)} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteBannerConfirm} onOpenChange={() => setDeleteBannerConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف هذا البنر نهائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBannerConfirm && handleDeleteBanner(deleteBannerConfirm)} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;
