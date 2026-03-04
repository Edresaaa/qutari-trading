import { useEffect, useState } from "react";
import { Review, getApprovedReviews } from "@/lib/reviews";
import { getProductById } from "@/lib/storage";
import StarRating from "./StarRating";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { User, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="slideRight">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="section-title">آراء عملائنا</h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">ماذا يقول عملاؤنا عن تجربتهم</p>
          </div>
        </ScrollAnimation>

        {/* Mobile: Carousel, Desktop: Grid */}
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => {
            const product = getProductById(review.product_id);
            return (
              <div key={review.id} className="bg-card rounded-2xl p-5 sm:p-6 border border-border relative h-full flex flex-col hover:border-accent/20 transition-colors">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent/15 absolute top-4 left-4" />
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{review.customer_name}</p>
                    {product && (
                      <p className="text-xs text-muted-foreground line-clamp-1">{product.name}</p>
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
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {reviews.length > 0 && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-5 border border-border relative"
                >
                  <Quote className="w-6 h-6 text-accent/15 absolute top-4 left-4" />
                  
                  {(() => {
                    const review = reviews[activeIndex];
                    const product = getProductById(review.product_id);
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{review.customer_name}</p>
                            {product && (
                              <p className="text-xs text-muted-foreground line-clamp-1">{product.name}</p>
                            )}
                          </div>
                        </div>

                        <StarRating rating={review.rating} size="sm" />

                        {review.comment && (
                          <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                            {review.comment}
                          </p>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.slice(0, 8).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-accent w-6" : "bg-muted w-1.5"
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
