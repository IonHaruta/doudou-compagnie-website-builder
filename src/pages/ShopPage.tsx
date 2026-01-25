import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";
import productBunny from "@/assets/product-bunny.jpg";
import productElephant from "@/assets/product-elephant.jpg";
import productBear from "@/assets/product-bear.jpg";
import productPuppy from "@/assets/product-puppy.jpg";

const products = [
  {
    id: 1,
    name: "Iepuraș Bonbon Roz",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    type: "doudous",
    ageRange: "0-6",
  },
  {
    id: 2,
    name: "Urs Lună Plină",
    price: 34.90,
    image: productGreyBear,
    badge: "new" as const,
    stock: "in-stock" as const,
    type: "plush",
    ageRange: "6-12",
  },
  {
    id: 3,
    name: "Marionetă Lup",
    price: 19.90,
    image: productWolf,
    badge: "bestseller" as const,
    stock: "limited" as const,
    type: "puppets",
    ageRange: "1-3",
  },
  {
    id: 4,
    name: "Cutie Muzicală Stea",
    price: 29.90,
    image: productMusicBox,
    badge: "new" as const,
    stock: "in-stock" as const,
    type: "music-boxes",
    ageRange: "0-6",
  },
  {
    id: 5,
    name: "Pui de Cerb Boh'aime",
    price: 27.90,
    image: productDeer,
    badge: "new" as const,
    stock: "in-stock" as const,
    type: "doudous",
    ageRange: "0-6",
  },
  {
    id: 6,
    name: "Iepuraș Floricică",
    price: 22.90,
    image: productBunny,
    badge: "bestseller" as const,
    stock: "in-stock" as const,
    type: "doudous",
    ageRange: "0-6",
  },
  {
    id: 7,
    name: "Elefant Boh'aime",
    price: 45.90,
    image: productElephant,
    badge: "new" as const,
    stock: "in-stock" as const,
    type: "plush",
    ageRange: "6-12",
  },
  {
    id: 8,
    name: "Urs Bonbon Maro",
    price: 65.90,
    image: productBear,
    badge: "bestseller" as const,
    stock: "limited" as const,
    type: "doudous",
    ageRange: "3+",
  },
  {
    id: 9,
    name: "Cățeluș Dormitor",
    price: 15.90,
    image: productPuppy,
    stock: "in-stock" as const,
    type: "plush",
    ageRange: "1-3",
  },
];

const productTypes = [
  { id: "doudous", label: "Doudous" },
  { id: "plush", label: "Jucării de Pluș" },
  { id: "puppets", label: "Marionete" },
  { id: "music-boxes", label: "Cutii Muzicale" },
];

const budgetRanges = [
  { id: "under-20", label: "Sub €20", min: 0, max: 20 },
  { id: "20-40", label: "€20 - €40", min: 20, max: 40 },
  { id: "40-60", label: "€40 - €60", min: 40, max: 60 },
  { id: "over-60", label: "Peste €60", min: 60, max: Infinity },
];

const ageRanges = [
  { id: "0-6", label: "0-6 luni" },
  { id: "6-12", label: "6-12 luni" },
  { id: "1-3", label: "1-3 ani" },
  { id: "3+", label: "3+ ani" },
];

const ShopPage = () => {
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(3);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    // Filter by budget
    if (selectedBudgets.length > 0) {
      result = result.filter((p) => {
        return selectedBudgets.some((budgetId) => {
          const budget = budgetRanges.find((b) => b.id === budgetId);
          if (!budget) return false;
          return p.price >= budget.min && p.price < budget.max;
        });
      });
    }

    // Filter by age
    if (selectedAges.length > 0) {
      result = result.filter((p) => selectedAges.includes(p.ageRange));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
        break;
    }

    return result;
  }, [selectedTypes, selectedBudgets, selectedAges, sortBy]);

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
              Magazin
            </h1>
            <p className="text-muted-foreground">{filteredProducts.length} rezultate</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-4">Filtre</h3>
              </div>

              {/* Product Type */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Tip produs?</h4>
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={() => toggleFilter(type.id, selectedTypes, setSelectedTypes)}
                      />
                      <span className="text-sm text-muted-foreground">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Bugetul tău?</h4>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedBudgets.includes(range.id)}
                        onCheckedChange={() => toggleFilter(range.id, selectedBudgets, setSelectedBudgets)}
                      />
                      <span className="text-sm text-muted-foreground">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Pentru ce vârstă?</h4>
                <div className="space-y-2">
                  {ageRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedAges.includes(range.id)}
                        onCheckedChange={() => toggleFilter(range.id, selectedAges, setSelectedAges)}
                      />
                      <span className="text-sm text-muted-foreground">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sortează" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Cele mai noi</SelectItem>
                  <SelectItem value="price-asc">Preț crescător</SelectItem>
                  <SelectItem value="price-desc">Preț descrescător</SelectItem>
                  <SelectItem value="popular">Popularitate</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setGridSize(2)}
                  className={`p-2 rounded ${gridSize === 2 ? 'bg-background shadow-sm' : ''}`}
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(3)}
                  className={`p-2 rounded ${gridSize === 3 ? 'bg-background shadow-sm' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(4)}
                  className={`p-2 rounded ${gridSize === 4 ? 'bg-background shadow-sm' : ''}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 lg:gap-6 ${
              gridSize === 2 ? 'grid-cols-2' : 
              gridSize === 3 ? 'grid-cols-2 md:grid-cols-3' : 
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
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
                  Nu am găsit produse cu filtrele selectate.
                </p>
                <button
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedBudgets([]);
                    setSelectedAges([]);
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Resetează filtrele
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;