import { Link } from "react-router-dom";
import { Category } from "@/types/store";
import { ArrowLeft } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/products?category=${category.slug}`} 
      className="group relative overflow-hidden rounded-2xl block"
    >
      <div className="aspect-[4/3] relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-chocolate/40 to-transparent z-10" />
        
        {/* Content */}
        <div className="absolute bottom-0 right-0 left-0 p-5 z-20">
          <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-1">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-primary-foreground/70 text-sm mb-3 line-clamp-1">
              {category.description}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all">
            تصفح المنتجات
            <ArrowLeft className="w-4 h-4" />
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-300 z-10" />
      </div>
    </Link>
  );
};

export default CategoryCard;
