import { Link } from "react-router-dom";
import { Category } from "@/types/store";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group block"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 border border-border/40 group-hover:border-accent/30 transition-all duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-3">
          <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-1">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
