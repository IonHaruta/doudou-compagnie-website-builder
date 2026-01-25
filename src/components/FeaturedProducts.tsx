import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import productBunny from "@/assets/product-bunny.jpg";
import productBear from "@/assets/product-bear.jpg";
import productElephant from "@/assets/product-elephant.jpg";
import productPuppy from "@/assets/product-puppy.jpg";

const products = [
  {
    id: 1,
    name: "Lapin de Sucre",
    price: 189.99,
    image: productBunny,
    category: "Jucării de Pluș",
    isNew: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Ursulețul Teddy",
    price: 159.99,
    originalPrice: 199.99,
    image: productBear,
    category: "Jucării de Pluș",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Elefănțelul Bleu",
    price: 179.99,
    image: productElephant,
    category: "Jucării de Pluș",
    isNew: true,
  },
  {
    id: 4,
    name: "Cățelușul Crème",
    price: 169.99,
    image: productPuppy,
    category: "Jucării de Pluș",
  },
];

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Cele Mai Îndrăgite
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Produse Populare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cele mai apreciate jucării de către părinți și copii din întreaga lume
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base border-foreground/20 hover:bg-foreground/5"
          >
            Vezi Toate Produsele
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
