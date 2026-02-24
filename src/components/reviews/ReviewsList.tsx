import { Review, getAverageRating } from "@/lib/reviews";
import StarRating from "./StarRating";
import { User } from "lucide-react";

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>لا توجد تقييمات بعد. كن أول من يقيّم!</p>
      </div>
    );
  }

  const average = getAverageRating(reviews);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border">
        <div className="text-center">
          <span className="text-3xl font-bold text-accent">{average}</span>
          <span className="text-muted-foreground text-lg">/5</span>
        </div>
        <div>
          <StarRating rating={Math.round(average)} size="md" />
          <p className="text-sm text-muted-foreground mt-1">{reviews.length} تقييم</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground text-sm">{review.customer_name}</span>
              </div>
              <StarRating rating={review.rating} size="sm" />
            </div>
            {review.comment && (
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">{review.comment}</p>
            )}
            <p className="text-xs text-muted-foreground/60 mt-2">
              {new Date(review.created_at).toLocaleDateString("ar-YE")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
