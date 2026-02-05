import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import { products, collections, budgetRanges, ageRanges, colorOptions, ageRangeOrder } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(3);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"boy" | "girl" | null>(null);
  const [sortByAge, setSortByAge] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const { t } = useLanguage();

  // Apply filters from URL params (from GiftFinder or Collections)
  useEffect(() => {
    const ageParam = searchParams.get("age");
    const collectionParam = searchParams.get("collection");
    const budgetParam = searchParams.get("budget");
    const colorParam = searchParams.get("color");
    const filterParam = searchParams.get("filter");
    const genderParam = searchParams.get("gender");
    const resetParam = searchParams.get("reset");

    // Reset all filters when "Toate Produsele" is clicked
    if (resetParam === "true") {
      setSelectedCollections([]);
      setSelectedBudgets([]);
      setSelectedAges([]);
      setSelectedColors([]);
      setShowSaleOnly(false);
      setShowNewOnly(false);
      setSelectedGender(null);
      setSortByAge(false);
      return;
    }

    if (ageParam) setSelectedAges([ageParam]);
    if (collectionParam) setSelectedCollections([collectionParam]);
    if (budgetParam) setSelectedBudgets([budgetParam]);
    if (colorParam) setSelectedColors([colorParam]);
    if (filterParam === "sale") setShowSaleOnly(true);
    if (filterParam === "new") setShowNewOnly(true);
    if (filterParam === "age") setSortByAge(true);
    if (filterParam === "gender") {
      // Toggle through: null -> boy -> girl -> null
      setSelectedGender("boy");
    }
    if (genderParam === "boy") setSelectedGender("boy");
    if (genderParam === "girl") setSelectedGender("girl");
  }, [searchParams]);

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

    // Filter by collection
    if (selectedCollections.length > 0) {
      result = result.filter((p) => selectedCollections.includes(p.collection));
    }

    // Filter by sale
    if (showSaleOnly) {
      result = result.filter((p) => p.badge === "sale");
    }

    // Filter by new products
    if (showNewOnly) {
      result = result.filter((p) => p.badge === "new");
    }

    // Filter by gender
    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender || p.gender === "unisex");
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

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    // Sort by age (ascending: newborn to 3+)
    if (sortByAge) {
      result.sort((a, b) => (ageRangeOrder[a.ageRange] || 0) - (ageRangeOrder[b.ageRange] || 0));
      return result;
    }

    // Regular sort
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
  }, [selectedCollections, selectedBudgets, selectedAges, selectedColors, showSaleOnly, showNewOnly, selectedGender, sortByAge, sortBy]);

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
              {t("shop.allProducts")}
            </h1>
            <p className="text-muted-foreground">{filteredProducts.length} {t("shop.results")}</p>
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
                <h3 className="font-display text-lg font-medium text-foreground mb-4">{t("shop.filters")}</h3>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={showSaleOnly}
                    onCheckedChange={(checked) => setShowSaleOnly(checked === true)}
                  />
                  <span className="text-sm text-muted-foreground">{t("catalog.sale")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={showNewOnly}
                    onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                  />
                  <span className="text-sm text-muted-foreground">{t("catalog.new")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedGender === "boy"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGender("boy");
                      } else {
                        setSelectedGender(null);
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">{t("catalog.forBoys")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedGender === "girl"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGender("girl");
                      } else {
                        setSelectedGender(null);
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">{t("catalog.forGirls")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={sortByAge}
                    onCheckedChange={(checked) => setSortByAge(checked === true)}
                  />
                  <span className="text-sm text-muted-foreground">{t("catalog.byAge")}</span>
                </label>
              </div>

              {/* Collections */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t("shop.collections")}</h4>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <label key={collection.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCollections.includes(collection.id)}
                        onCheckedChange={() => toggleFilter(collection.id, selectedCollections, setSelectedCollections)}
                      />
                      <span className="text-sm text-muted-foreground">{t(collection.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t("shop.budget")}</h4>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedBudgets.includes(range.id)}
                        onCheckedChange={() => toggleFilter(range.id, selectedBudgets, setSelectedBudgets)}
                      />
                      <span className="text-sm text-muted-foreground">{t(range.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t("shop.age")}</h4>
                <div className="space-y-2">
                  {ageRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedAges.includes(range.id)}
                        onCheckedChange={() => toggleFilter(range.id, selectedAges, setSelectedAges)}
                      />
                      <span className="text-sm text-muted-foreground">{t(range.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t("shop.color")}</h4>
                <div className="space-y-2">
                  {colorOptions.map((color) => (
                    <label key={color.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedColors.includes(color.id)}
                        onCheckedChange={() => toggleFilter(color.id, selectedColors, setSelectedColors)}
                      />
                      <span 
                        className="w-4 h-4 rounded-full border border-border" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm text-muted-foreground">{t(color.labelKey)}</span>
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
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sortează" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("shop.sortNewest")}</SelectItem>
                  <SelectItem value="price-asc">{t("shop.sortPriceAsc")}</SelectItem>
                  <SelectItem value="price-desc">{t("shop.sortPriceDesc")}</SelectItem>
                  <SelectItem value="popular">{t("shop.sortPopular")}</SelectItem>
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
                    <ProductCard
                      id={product.id}
                      nameKey={product.nameKey}
                      price={product.price}
                      originalPrice={product.originalPrice}
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
                  {t("shop.noResults")}
                </p>
                <button
                  onClick={() => {
                    setSelectedCollections([]);
                    setSelectedBudgets([]);
                    setSelectedAges([]);
                    setSelectedColors([]);
                    setShowSaleOnly(false);
                    setShowNewOnly(false);
                    setSelectedGender(null);
                    setSortByAge(false);
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  {t("shop.resetFilters")}
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
