import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/storage";
import { Product, Category } from "@/types/store";
import { Plus, Pencil, Trash2, X, ArrowRight, Package } from "lucide-react";
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

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  image: "",
  category: "",
  inStock: true,
  featured: false,
};

const AdminPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
  };

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
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
      setFormData(initialFormData);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : undefined,
      image: formData.image,
      category: formData.category,
      inStock: formData.inStock,
      featured: formData.featured,
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
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    loadData();
    setDeleteConfirm(null);
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج بنجاح",
      variant: "destructive",
    });
  };

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
              <h1 className="text-3xl font-bold text-foreground">إدارة المنتجات</h1>
            </div>
            <Button onClick={() => handleOpenForm()} className="btn-gold">
              <Plus className="w-5 h-5 ml-2" />
              إضافة منتج جديد
            </Button>
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            {products.length > 0 ? (
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
                    {products.map((product) => (
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
                              onClick={() => handleOpenForm(product)}
                              className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
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
                <p className="text-muted-foreground mb-4">لا توجد منتجات حالياً</p>
                <Button onClick={() => handleOpenForm()} className="btn-gold">
                  <Plus className="w-5 h-5 ml-2" />
                  أضف أول منتج
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">اسم المنتج *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="مثال: شال كشميري فاخر"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">الوصف *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
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
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  placeholder="399"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">رابط الصورة *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                required
                className="mt-1"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="معاينة"
                  className="mt-2 w-20 h-20 object-cover rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>

            <div>
              <Label htmlFor="category">القسم *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
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
                checked={formData.inStock}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, inStock: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <Label htmlFor="featured">منتج مميز</Label>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-gold flex-1">
                {editingProduct ? "حفظ التغييرات" : "إضافة المنتج"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseForm}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
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
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
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
