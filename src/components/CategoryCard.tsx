import { Link } from "react-router-dom";
import { Category } from "@/types/store";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/products?category=${category.slug}`} 
      className="group relative overflow-hidden rounded-2xl block"
    >
      <motion.div 
        className="aspect-[4/3] relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        
        {/* Glass border effect on hover */}
        <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-300 z-20" />
        
        {/* Content */}
        <div className="absolute bottom-0 right-0 left-0 p-5 z-20">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
              {category.description}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
            تصفح المنتجات
            <ArrowLeft className="w-4 h-4" />
          </span>
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
