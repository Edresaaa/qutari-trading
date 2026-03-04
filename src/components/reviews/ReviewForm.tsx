import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitReview } from "@/lib/reviews";
import StarRating from "./StarRating";
import { Loader2, Send } from "lucide-react";

interface ReviewFormProps {
  productId: string;
  onSubmitted?: () => void;
}

const ReviewForm = ({ productId, onSubmitted }: ReviewFormProps) => {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال اسمك", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "خطأ", description: "يرجى اختيار التقييم", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const success = await submitReview({
      product_id: productId,
      customer_name: customerName.trim(),
      rating,
      comment: comment.trim() || undefined,
    });

    setIsSubmitting(false);

    if (success) {
      toast({
        title: "شكراً لتقييمك! ⭐",
        description: "سيتم نشر تقييمك بعد المراجعة",
      });
      setCustomerName("");
      setRating(0);
      setComment("");
      onSubmitted?.();
    } else {
      toast({ title: "خطأ", description: "حدث خطأ، حاول مجدداً", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl p-5 sm:p-6 border border-border">
      <h3 className="font-bold text-foreground text-base sm:text-lg">أضف تقييمك</h3>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">التقييم</label>
        <div className="py-1">
          <StarRating rating={rating} size="lg" interactive onRate={setRating} />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">الاسم</label>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="اكتب اسمك"
          maxLength={50}
          required
          className="h-11"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">تعليقك (اختياري)</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="شاركنا رأيك في المنتج..."
          maxLength={500}
          rows={3}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="btn-gold w-full h-11 sm:h-12 text-sm sm:text-base">
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            إرسال التقييم
          </>
        )}
      </Button>
    </form>
  );
};

export default ReviewForm;
