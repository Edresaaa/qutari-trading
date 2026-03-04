import { useEffect, useState } from "react";
import { Review, getApprovedReviews } from "@/lib/reviews";
import { getProductById } from "@/lib/storage";
import StarRating from "./StarRating";
import { User, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getApprovedReviews(8).then(setReviews);
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const ReviewCard = ({ review }: { review: Review }) => {
    const product = getProductById(review.product_id);
    return (
      <div className="bg-card rounded-xl p-4 border border-border/50 relative flex flex-col h-full">
        <Quote className="w-5 h-5 text-accent/10 absolute top-3 left-3" />
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-accent" />
          </div>
          <div>
            <p className="font-bold text-foreground text-xs">{review.customer_name}</p>
            {product && <p className="text-[10px] text-muted-foreground line-clamp-1">{product.name}</p>}
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
        {review.comment && (
          <p className="text-muted-foreground text-xs leading-relaxed mt-2 flex-1">{review.comment}</p>
        )}
      </div>
    );
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">آراء عملائنا</h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {reviews.slice(0, 8).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            {reviews.length > 0 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <ReviewCard review={reviews[activeIndex]} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center gap-1 mt-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === activeIndex ? "bg-accent w-5" : "bg-muted w-1"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
