import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";

const products = [
  {
    id: 1,
    name: "Iepuraș Bonbon Roz",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
  },
  {
    id: 2,
    name: "Urs Lună Plină",
    price: 34.90,
    image: productGreyBear,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
  {
    id: 3,
    name: "Marionetă Lup",
    price: 19.90,
    image: productWolf,
    badge: "bestseller" as const,
    stock: "limited" as const,
  },
  {
    id: 4,
    name: "Cutie Muzicală Stea",
    price: 29.90,
    image: productMusicBox,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
  {
    id: 5,
    name: "Pui de Cerb Boh'aime Roz",
    price: 27.90,
    image: productDeer,
    badge: "new" as const,
    stock: "in-stock" as const,
  },
];

const FeaturedProducts = () => {
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
              Creațiile Noastre Vedetă
            </h2>
            <p className="text-muted-foreground">
              Companioni moi și consolatori pentru fiecare etapă
            </p>
          </div>
          <Button
            variant="outline"
            className="self-start md:self-auto px-6 py-5 border-foreground/20 hover:bg-foreground/5 rounded-full"
          >
            Vezi Tot
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
