import { Link } from "react-router-dom";
import { Category } from "@/types/store";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.slug}`} className="category-card block">
      <div className="aspect-[4/3] relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent z-10" />
        <div className="absolute bottom-0 right-0 left-0 p-4 z-20">
          <h3 className="text-xl font-bold text-primary-foreground">{category.name}</h3>
          <p className="text-gold text-sm mt-1">تصفح المنتجات ←</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
