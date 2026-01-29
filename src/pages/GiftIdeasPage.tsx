import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Package, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";
import productBunny from "@/assets/product-bunny.jpg";
import productElephant from "@/assets/product-elephant.jpg";
import productBear from "@/assets/product-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";

const giftProducts = [
  {
    id: 1,
    nameKey: "product.pinkBunny",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birth",
    ageRange: "0-6",
  },
  {
    id: 2,
    nameKey: "product.greyBear",
    price: 34.90,
    image: productGreyBear,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birth",
    ageRange: "0-6",
  },
  {
    id: 3,
    nameKey: "product.musicBox",
    price: 29.90,
    image: productMusicBox,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "baptism",
    ageRange: "0-6",
  },
  {
    id: 4,
    nameKey: "product.deer",
    price: 27.90,
    image: productDeer,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "baptism",
    ageRange: "6-12",
  },
  {
    id: 5,
    nameKey: "product.bunny",
    price: 22.90,
    image: productBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    occasion: "birthday",
    ageRange: "6-12",
  },
  {
    id: 6,
    nameKey: "product.elephant",
    price: 45.90,
    image: productElephant,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "birthday",
    ageRange: "1-3",
  },
  {
    id: 7,
    nameKey: "product.bear",
    price: 65.90,
    image: productBear,
    badge: "bestseller" as const,
    stock: "limited" as const,
    occasion: "gift-sets",
    ageRange: "1-3",
  },
  {
    id: 8,
    nameKey: "product.wolfPuppet",
    price: 39.90,
    image: productWolf,
    badge: "new" as const,
    stock: "in-stock" as const,
    occasion: "gift-sets",
    ageRange: "3+",
  },
];

const GiftIdeasPage = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const { t } = useLanguage();

  const occasions = [
    {
      id: "birth",
      icon: Heart,
      title: t("occasion.birth"),
      description: t("occasion.birthDesc"),
    },
    {
      id: "baptism",
      icon: Sparkles,
      title: t("occasion.baptism"),
      description: t("occasion.baptismDesc"),
    },
    {
      id: "birthday",
      icon: Gift,
      title: t("occasion.birthday"),
      description: t("occasion.birthdayDesc"),
    },
    {
      id: "gift-sets",
      icon: Package,
      title: t("occasion.giftSets"),
      description: t("occasion.giftSetsDesc"),
    },
  ];

  const ageRanges = [
    { id: "0-6", label: t("age.0-6") },
    { id: "6-12", label: t("age.6-12") },
    { id: "1-3", label: t("age.1-3") },
    { id: "3+", label: t("age.3+") },
  ];

  const filteredProducts = useMemo(() => {
    return giftProducts.filter((product) => {
      const matchesOccasion = !selectedOccasion || product.occasion === selectedOccasion;
      const matchesAge = !selectedAge || product.ageRange === selectedAge;
      return matchesOccasion && matchesAge;
    });
  }, [selectedOccasion, selectedAge]);

  const hasActiveFilters = selectedOccasion || selectedAge;

  const clearFilters = () => {
    setSelectedOccasion(null);
    setSelectedAge(null);
  };

  const getSectionTitle = () => {
    if (!selectedOccasion && !selectedAge) return t("giftIdeas.allGifts");
    
    const parts = [];
    if (selectedOccasion) {
      const occasion = occasions.find((o) => o.id === selectedOccasion);
      if (occasion) parts.push(occasion.title);
    }
    if (selectedAge) {
      const age = ageRanges.find((a) => a.id === selectedAge);
      if (age) parts.push(age.label);
    }
    
    return `${t("giftIdeas.giftsFor")} ${parts.join(" • ")}`;
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
              {t("giftIdeas.title")}
            </h1>
            <p className="text-muted-foreground">{t("giftIdeas.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Occasion Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {t("giftIdeas.filterByOccasion")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {occasions.map((occasion, index) => (
              <motion.button
                key={occasion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedOccasion(
                  selectedOccasion === occasion.id ? null : occasion.id
                )}
                className={`p-5 rounded-2xl border-2 text-center transition-all ${
                  selectedOccasion === occasion.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-soft-pink flex items-center justify-center">
                  <occasion.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display text-base font-medium text-foreground mb-1">
                  {occasion.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {occasion.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Age Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {t("giftIdeas.filterByAge")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {ageRanges.map((age) => (
              <button
                key={age.id}
                onClick={() => setSelectedAge(selectedAge === age.id ? null : age.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedAge === age.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              {t("giftIdeas.clearFilters")}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Gift Ideas Products */}
      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <motion.div
          key={`${selectedOccasion}-${selectedAge}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground">
            {getSectionTitle()}
          </h2>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} {t("common.productsFound")}
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
                <ProductCard
                  id={product.id}
                  nameKey={product.nameKey}
                  price={product.price}
                  image={product.image}
                  badge={product.badge}
                  stock={product.stock}
                />
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
              {t("giftIdeas.noProducts")}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              {t("giftIdeas.showAll")}
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GiftIdeasPage;
