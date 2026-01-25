import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  isBestseller,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
            Nou
          </span>
        )}
        {isBestseller && (
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            Bestseller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 w-9 h-9 bg-card/80 backdrop-blur-sm hover:bg-card rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Heart className="w-4 h-4 text-muted-foreground" />
      </Button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 lg:p-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display text-lg font-medium text-foreground mt-1 mb-2 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              {price.toFixed(2)} RON
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toFixed(2)} RON
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="w-9 h-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
