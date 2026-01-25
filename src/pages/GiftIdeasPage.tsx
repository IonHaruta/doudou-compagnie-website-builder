import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";
import productBunny from "@/assets/product-bunny.jpg";
import productElephant from "@/assets/product-elephant.jpg";
import productBear from "@/assets/product-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";

const occasions = [
  {
    id: "birth",
    icon: Heart,
    title: "Naștere",
    description: "Celebrați sosirea bebelușului",
  },
  {
    id: "baptism",
    icon: Sparkles,
    title: "Botez",
    description: "O amintire de neuitat",
  },
  {
    id: "birthday",
    icon: Gift,
    title: "Zi de Naștere",
    description: "Bucurați cei mici",
  },
  {
    id: "gift-sets",
    icon: Package,
    title: "Seturi Cadou",
    description: "Tot într-unul, gata de oferit",
  },
];

const giftProducts = [
  {
    id: 1,
    name: "Iepuraș Bonbon Roz",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birth",
  },
  {
    id: 2,
    name: "Urs Lună Plină",
    price: 34.90,
    image: productGreyBear,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birth",
  },
  {
    id: 3,
    name: "Cutie Muzicală Stea",
    price: 29.90,
    image: productMusicBox,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "baptism",
  },
  {
    id: 4,
    name: "Pui de Cerb Boh'aime",
    price: 27.90,
    image: productDeer,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "baptism",
  },
  {
    id: 5,
    name: "Iepuraș Floricică",
    price: 22.90,
    image: productBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birthday",
  },
  {
    id: 6,
    name: "Elefant Boh'aime",
    price: 45.90,
    image: productElephant,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "birthday",
  },
  {
    id: 7,
    name: "Set Cadou Premium Urs",
    price: 65.90,
    image: productBear,
    badge: "bestseller" as const,
    stock: "limited" as const,
    occasion: "gift-sets",
  },
  {
    id: 8,
    name: "Set Marionetă Lup",
    price: 39.90,
    image: productWolf,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "gift-sets",
  },
];

const GiftIdeasPage = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedOccasion) {
      return giftProducts;
    }
    return giftProducts.filter((product) => product.occasion === selectedOccasion);
  }, [selectedOccasion]);

  const getSectionTitle = () => {
    if (!selectedOccasion) return "Toate Ideile Cadouri";
    const occasion = occasions.find((o) => o.id === selectedOccasion);
    return occasion ? `Cadouri pentru ${occasion.title}` : "Idei Cadouri";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 lg:pt-24 pb-8 bg-soft-pink/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-2">
              Idei Cadouri
            </h1>
            <p className="text-muted-foreground">Răspundeți la câteva întrebări pentru a găsi doudoul ideal</p>
          </motion.div>
        </div>
      </div>

      {/* Occasions */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {occasions.map((occasion, index) => (
            <motion.button
              key={occasion.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedOccasion(
                selectedOccasion === occasion.id ? null : occasion.id
              )}
              className={`p-6 rounded-2xl border-2 text-center transition-all ${
                selectedOccasion === occasion.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-soft-pink flex items-center justify-center">
                <occasion.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-1">
                {occasion.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {occasion.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gift Ideas Products */}
      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <motion.div
          key={selectedOccasion || "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground">
            {getSectionTitle()}
          </h2>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} produse găsite
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              Nu am găsit produse pentru această ocazie.
            </p>
            <button
              onClick={() => setSelectedOccasion(null)}
              className="mt-4 text-primary hover:underline"
            >
              Afișează toate produsele
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GiftIdeasPage;