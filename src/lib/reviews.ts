import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

// Fetch approved reviews for a product
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
  return (data || []) as Review[];
};

// Fetch all approved reviews (for homepage)
export const getApprovedReviews = async (limit = 6): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
  return (data || []) as Review[];
};

// Submit a new review
export const submitReview = async (review: {
  product_id: string;
  customer_name: string;
  rating: number;
  comment?: string;
}): Promise<boolean> => {
  const { error } = await supabase.from("reviews").insert({
    product_id: review.product_id,
    customer_name: review.customer_name.trim(),
    rating: review.rating,
    comment: review.comment?.trim() || null,
    is_approved: false,
  });

  if (error) {
    console.error("Error submitting review:", error);
    return false;
  }
  return true;
};

// Fetch ALL reviews (for admin - needs edge function)
export const getAllReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase.functions.invoke("manage-reviews", {
    body: { action: "list" },
  });

  if (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
  return (data?.reviews || []) as Review[];
};

// Approve a review (admin)
export const approveReview = async (reviewId: string): Promise<boolean> => {
  const { error } = await supabase.functions.invoke("manage-reviews", {
    body: { action: "approve", reviewId },
  });
  return !error;
};

// Delete a review (admin)
export const deleteReview = async (reviewId: string): Promise<boolean> => {
  const { error } = await supabase.functions.invoke("manage-reviews", {
    body: { action: "delete", reviewId },
  });
  return !error;
};

// Calculate average rating
export const getAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};
