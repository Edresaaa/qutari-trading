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
} from "@/lib/storage";
import { uploadProductImage, uploadCategoryImage } from "@/lib/imageUpload";
import { Product, Category } from "@/types/store";
import { 
  Plus, Pencil, Trash2, ArrowRight, Package, Lock, Eye, EyeOff,
  FolderOpen, ShoppingBag, Search, Upload, Loader2, Image
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
}

interface CategoryFormData {
  name: string;
  slug: string;
  image: string;
  description: string;
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
};

const initialCategoryFormData: CategoryFormData = {
  name: "",
  slug: "",
  image: "",
  description: "",
};

const AdminPage = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

  // Product image upload
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProductImage(true);
    try {
      const url = await uploadProductImage(file);
      if (url) {
        setProductFormData({ ...productFormData, image: url });
        toast({
          title: "تم الرفع",
          description: "تم رفع الصورة بنجاح",
        });
      } else {
        toast({
          title: "خطأ",
          description: "فشل في رفع الصورة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setIsUploadingProductImage(false);
    }
  };

  // Category image upload
  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCategoryImage(true);
    try {
      const url = await uploadCategoryImage(file);
      if (url) {
        setCategoryFormData({ ...categoryFormData, image: url });
        toast({
          title: "تم الرفع",
          description: "تم رفع الصورة بنجاح",
        });
      } else {
        toast({
          title: "خطأ",
          description: "فشل في رفع الصورة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setIsUploadingCategoryImage(false);
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

    const productData = {
      name: productFormData.name,
      description: productFormData.description,
      price: parseFloat(productFormData.price),
      originalPrice: productFormData.originalPrice
        ? parseFloat(productFormData.originalPrice)
        : undefined,
      image: productFormData.image,
      category: productFormData.category,
      inStock: productFormData.inStock,
      featured: productFormData.featured,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({
        title: "تم التحديث",
        description: "تم تحديث المنتج بنجاح",
      });
    } else {
      addProduct(productData);
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة المنتج بنجاح",
      });
    }

    loadData();
    handleCloseProductForm();
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    loadData();
    setDeleteProductConfirm(null);
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج بنجاح",
      variant: "destructive",
    });
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
      toast({
        title: "تم التحديث",
        description: "تم تحديث القسم بنجاح",
      });
    } else {
      addCategory(categoryData);
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة القسم بنجاح",
      });
    }

    loadData();
    handleCloseCategoryForm();
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
    loadData();
    setDeleteCategoryConfirm(null);
    toast({
      title: "تم الحذف",
      description: "تم حذف القسم بنجاح",
      variant: "destructive",
    });
  };

  // Filter products by search
  const filteredProducts = products.filter(product =>
    product.name.includes(searchQuery) || 
    product.description.includes(searchQuery)
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
                  <Lock className="w-10 h-10 text-chocolate" />
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

                {loginError && (
                  <p className="text-destructive text-sm text-center">{loginError}</p>
                )}

                <Button type="submit" className="btn-gold w-full">
                  دخول
                </Button>
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
                <Link to="/" className="hover:text-accent">
                  الرئيسية
                </Link>
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

          {/* Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                الأقسام
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                {/* Header */}
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
                    إضافة منتج جديد
                  </Button>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-right px-6 py-4 font-bold text-foreground">
                            المنتج
                          </th>
                          <th className="text-right px-6 py-4 font-bold text-foreground hidden md:table-cell">
                            القسم
                          </th>
                          <th className="text-right px-6 py-4 font-bold text-foreground">
                            السعر
                          </th>
                          <th className="text-right px-6 py-4 font-bold text-foreground hidden sm:table-cell">
                            الحالة
                          </th>
                          <th className="text-right px-6 py-4 font-bold text-foreground">
                            إجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="font-medium text-foreground line-clamp-1">
                                    {product.name}
                                  </p>
                                  {product.featured && (
                                    <span className="text-xs text-gold">مميز</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <span className="text-muted-foreground">
                                {categories.find((c) => c.slug === product.category)?.name ||
                                  product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-accent">
                                {product.price} ر.ي
                              </span>
                            </td>
                            <td className="px-6 py-4 hidden sm:table-cell">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded ${
                                  product.inStock
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {product.inStock ? "متوفر" : "نفذ"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenProductForm(product)}
                                  className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteProductConfirm(product.id)}
                                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "لا توجد نتائج للبحث" : "لا توجد منتجات حالياً"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => handleOpenProductForm()} className="btn-gold">
                        <Plus className="w-5 h-5 ml-2" />
                        أضف أول منتج
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-foreground">إدارة الأقسام</h3>
                  <Button onClick={() => handleOpenCategoryForm()} className="btn-gold">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة قسم جديد
                  </Button>
                </div>

                {categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {categories.map((category) => (
                      <div 
                        key={category.id} 
                        className="relative group rounded-xl overflow-hidden border border-border"
                      >
                        <div className="aspect-video">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-lg font-bold text-primary-foreground">
                            {category.name}
                          </h4>
                          {category.description && (
                            <p className="text-primary-foreground/70 text-sm line-clamp-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                        <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenCategoryForm(category)}
                            className="p-2 bg-card rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteCategoryConfirm(category.id)}
                            className="p-2 bg-card rounded-lg text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FolderOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">لا توجد أقسام حالياً</p>
                    <Button onClick={() => handleOpenCategoryForm()} className="btn-gold">
                      <Plus className="w-5 h-5 ml-2" />
                      أضف أول قسم
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Product Form Dialog */}
      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitProduct} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">اسم المنتج *</Label>
              <Input
                id="name"
                value={productFormData.name}
                onChange={(e) =>
                  setProductFormData({ ...productFormData, name: e.target.value })
                }
                placeholder="مثال: غتره كشميري فاخرة"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">الوصف *</Label>
              <Textarea
                id="description"
                value={productFormData.description}
                onChange={(e) =>
                  setProductFormData({ ...productFormData, description: e.target.value })
                }
                placeholder="وصف المنتج..."
                required
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">السعر (ر.ي) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={productFormData.price}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, price: e.target.value })
                  }
                  placeholder="299"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">السعر قبل الخصم</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={productFormData.originalPrice}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, originalPrice: e.target.value })
                  }
                  placeholder="399"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>صورة المنتج *</Label>
              <div className="mt-1 space-y-3">
                {/* Upload button */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors"
                  onClick={() => productImageInputRef.current?.click()}
                >
                  {isUploadingProductImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري الرفع...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">اضغط لرفع صورة</span>
                    </div>
                  )}
                </div>
                <input
                  ref={productImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageUpload}
                  className="hidden"
                />

                {/* Or enter URL */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">أو أدخل رابط</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <Input
                  value={productFormData.image}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />

                {productFormData.image && (
                  <img
                    src={productFormData.image}
                    alt="معاينة"
                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="category">القسم *</Label>
              <Select
                value={productFormData.category}
                onValueChange={(value) =>
                  setProductFormData({ ...productFormData, category: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between py-2">
              <Label htmlFor="inStock">متوفر في المخزون</Label>
              <Switch
                id="inStock"
                checked={productFormData.inStock}
                onCheckedChange={(checked) =>
                  setProductFormData({ ...productFormData, inStock: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <Label htmlFor="featured">منتج مميز</Label>
              <Switch
                id="featured"
                checked={productFormData.featured}
                onCheckedChange={(checked) =>
                  setProductFormData({ ...productFormData, featured: checked })
                }
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-gold flex-1" disabled={isUploadingProductImage}>
                {editingProduct ? "حفظ التغييرات" : "إضافة المنتج"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseProductForm}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Form Dialog */}
      <Dialog open={isCategoryFormOpen} onOpenChange={setIsCategoryFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "تعديل القسم" : "إضافة قسم جديد"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitCategory} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="catName">اسم القسم *</Label>
              <Input
                id="catName"
                value={categoryFormData.name}
                onChange={(e) =>
                  setCategoryFormData({ ...categoryFormData, name: e.target.value })
                }
                placeholder="مثال: غتر كشميري"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="catSlug">الرابط (اختياري)</Label>
              <Input
                id="catSlug"
                value={categoryFormData.slug}
                onChange={(e) =>
                  setCategoryFormData({ ...categoryFormData, slug: e.target.value })
                }
                placeholder="مثال: kashmiri-vip"
                className="mt-1"
                dir="ltr"
              />
            </div>

            <div>
              <Label>صورة القسم *</Label>
              <div className="mt-1 space-y-3">
                {/* Upload button */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors"
                  onClick={() => categoryImageInputRef.current?.click()}
                >
                  {isUploadingCategoryImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري الرفع...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Image className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">اضغط لرفع صورة</span>
                    </div>
                  )}
                </div>
                <input
                  ref={categoryImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCategoryImageUpload}
                  className="hidden"
                />

                {/* Or enter URL */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">أو أدخل رابط</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <Input
                  value={categoryFormData.image}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />

                {categoryFormData.image && (
                  <img
                    src={categoryFormData.image}
                    alt="معاينة"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="catDescription">الوصف</Label>
              <Textarea
                id="catDescription"
                value={categoryFormData.description}
                onChange={(e) =>
                  setCategoryFormData({ ...categoryFormData, description: e.target.value })
                }
                placeholder="وصف القسم..."
                className="mt-1"
                rows={2}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-gold flex-1" disabled={isUploadingCategoryImage}>
                {editingCategory ? "حفظ التغييرات" : "إضافة القسم"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseCategoryForm}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProductConfirm}
        onOpenChange={() => setDeleteProductConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProductConfirm && handleDeleteProduct(deleteProductConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Category Confirmation Dialog */}
      <AlertDialog
        open={!!deleteCategoryConfirm}
        onOpenChange={() => setDeleteCategoryConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا القسم؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCategoryConfirm && handleDeleteCategory(deleteCategoryConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default AdminPage;
