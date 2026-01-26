import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: "bestseller" | "new";
  stock: "in-stock" | "limited" | "out-of-stock";
}

const ProductCard = ({ id, name, price, image, badge, stock }: ProductCardProps) => {
  const stockLabels = {
    "in-stock": { text: "În stoc", color: "text-sage-green" },
    "limited": { text: "Stoc limitat", color: "text-primary" },
    "out-of-stock": { text: "Indisponibil", color: "text-muted-foreground" },
  };

  const badgeLabels = {
    bestseller: { text: "Cel mai vândut", bg: "bg-primary" },
    new: { text: "Nou", bg: "bg-sage-green" },
  };

  return (
    <Link to={`/produs/${id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-card rounded-2xl overflow-hidden shadow-soft cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {badge && (
            <span
              className={`absolute top-4 left-4 z-10 px-3 py-1.5 ${badgeLabels[badge].bg} text-primary-foreground text-xs font-medium rounded-full`}
            >
              {badgeLabels[badge].text}
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-medium text-foreground mb-2 line-clamp-1">
            {name}
          </h3>
          <p className="text-lg font-semibold text-foreground mb-1">
            €{price.toFixed(2)}
          </p>
          <p className={`text-sm ${stockLabels[stock].color}`}>
            {stockLabels[stock].text}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
