import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";

const products = [
  {
    id: 1,
    nameKey: "product.pinkBunny",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
  },
  {
    id: 2,
    nameKey: "product.greyBear",
    price: 34.90,
    image: productGreyBear,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
  {
    id: 3,
    nameKey: "product.wolfPuppet",
    price: 19.90,
    image: productWolf,
    badge: "bestseller" as const,
    stock: "limited" as const,
  },
  {
    id: 4,
    nameKey: "product.musicBox",
    price: 29.90,
    image: productMusicBox,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
  {
    id: 5,
    nameKey: "product.deer",
    price: 27.90,
    image: productDeer,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
];

const FeaturedProducts = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground italic mb-2">
              {t("featured.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("featured.subtitle")}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto px-6 py-5 border-foreground/20 hover:bg-foreground/5 rounded-full"
          >
            <Link to="/magazin">{t("featured.viewAll")}</Link>
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
