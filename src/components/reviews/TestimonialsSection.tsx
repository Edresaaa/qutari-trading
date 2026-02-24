import { useEffect, useState } from "react";
import { Review, getApprovedReviews } from "@/lib/reviews";
import { getProductById } from "@/lib/storage";
import StarRating from "./StarRating";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";
import { User, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getApprovedReviews(6).then(setReviews);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="slideRight">
          <div className="text-center mb-10">
            <h2 className="section-title">آراء عملائنا</h2>
            <p className="text-muted-foreground mt-3">ماذا يقول عملاؤنا عن تجربتهم</p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => {
            const product = getProductById(review.product_id);
            return (
              <StaggerItem key={review.id}>
                <div className="bg-card rounded-2xl p-6 border border-border relative h-full flex flex-col">
                  <Quote className="w-8 h-8 text-accent/20 absolute top-4 left-4" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{review.customer_name}</p>
                      {product && (
                        <p className="text-xs text-muted-foreground">{product.name}</p>
                      )}
                    </div>
                  </div>

                  <StarRating rating={review.rating} size="sm" />

                  {review.comment && (
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3 flex-1">
                      {review.comment}
                    </p>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
