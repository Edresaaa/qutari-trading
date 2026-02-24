import { useState, useEffect } from "react";
import { Review, getAllReviews, approveReview, deleteReview } from "@/lib/reviews";
import { getProductById } from "@/lib/storage";
import StarRating from "@/components/reviews/StarRating";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Trash2, Loader2, User } from "lucide-react";
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

const AdminReviewsTab = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getAllReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = async (id: string) => {
    const success = await approveReview(id);
    if (success) {
      toast({ title: "تم", description: "تم الموافقة على التقييم" });
      loadReviews();
    } else {
      toast({ title: "خطأ", description: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteReview(id);
    if (success) {
      toast({ title: "تم الحذف", description: "تم حذف التقييم", variant: "destructive" });
      loadReviews();
    }
    setDeleteConfirm(null);
  };

  const pendingReviews = reviews.filter((r) => !r.is_approved);
  const approvedReviews = reviews.filter((r) => r.is_approved);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pending Reviews */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          بانتظار الموافقة
          {pendingReviews.length > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
              {pendingReviews.length}
            </span>
          )}
        </h3>
        {pendingReviews.length === 0 ? (
          <p className="text-muted-foreground text-sm bg-card rounded-xl p-4">لا توجد تقييمات معلقة</p>
        ) : (
          <div className="space-y-3">
            {pendingReviews.map((review) => {
              const product = getProductById(review.product_id);
              return (
                <div key={review.id} className="bg-card rounded-xl p-4 border-2 border-accent/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground text-sm">{review.customer_name}</span>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      {product && (
                        <p className="text-xs text-accent mb-1">المنتج: {product.name}</p>
                      )}
                      {review.comment && (
                        <p className="text-muted-foreground text-sm">{review.comment}</p>
                      )}
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        {new Date(review.created_at).toLocaleDateString("ar-YE")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(review.id)} className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteConfirm(review.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Approved Reviews */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">التقييمات المنشورة ({approvedReviews.length})</h3>
        {approvedReviews.length === 0 ? (
          <p className="text-muted-foreground text-sm bg-card rounded-xl p-4">لا توجد تقييمات منشورة</p>
        ) : (
          <div className="space-y-3">
            {approvedReviews.map((review) => {
              const product = getProductById(review.product_id);
              return (
                <div key={review.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground text-sm">{review.customer_name}</span>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      {product && (
                        <p className="text-xs text-accent mb-1">المنتج: {product.name}</p>
                      )}
                      {review.comment && (
                        <p className="text-muted-foreground text-sm">{review.comment}</p>
                      )}
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteConfirm(review.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirm Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف هذا التقييم نهائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-destructive text-destructive-foreground"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReviewsTab;
