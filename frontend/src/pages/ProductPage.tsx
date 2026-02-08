import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Minus, Plus, Truck, RefreshCw, Shield, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { getCatalogProduct } from "@/services/catalogApi";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const numId = Number(id);
    const fromStatic = staticProducts.find((p) => p.id === numId);
    if (fromStatic) {
      setProduct(fromStatic);
      setLoading(false);
      return;
    }
    getCatalogProduct(numId)
      .then((p) => p && setProduct(p as Product))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-display">{t("product.notFound")}</h1>
          <Link to="/magazin" className="text-primary hover:underline mt-4 inline-block">
            {t("product.backToShop")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productName = product.name ?? t(product.nameKey);

  const relatedProducts = staticProducts
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  const stockLabels = {
    "in-stock": { text: t("product.inStock"), color: "text-sage-green" },
    "limited": { text: t("product.limitedStock"), color: "text-primary" },
    "out-of-stock": { text: t("product.outOfStock"), color: "text-muted-foreground" },
  };

  const badgeLabels = {
    bestseller: { text: t("common.bestseller"), bg: "bg-primary" },
    new: { text: t("common.new"), bg: "bg-sage-green" },
    sale: { text: t("common.sale"), bg: "bg-destructive" },
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: productName,
      price: product.price,
      image: product.image,
    }, quantity);
    toast({
      title: t("product.addedToCart"),
      description: `${quantity}x ${productName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-20 lg:pt-24 pb-4">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/magazin" className="hover:text-foreground transition-colors">
              {t("nav.shop")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{productName}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
          >
            {product.badge && (
              <span
                className={`absolute top-4 left-4 z-10 px-3 py-1.5 ${badgeLabels[product.badge].bg} text-primary-foreground text-xs font-medium rounded-full`}
              >
                {badgeLabels[product.badge].text}
              </span>
            )}
            <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors">
              <Heart className="w-5 h-5 text-muted-foreground" />
            </button>
            <img
              src={product.image}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-3">
              {productName}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} {t("product.reviews")})
                </span>
              </div>
            )}

            {/* Price */}
            <p className="text-3xl font-semibold text-foreground mb-4">
              €{product.price.toFixed(2)}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                product.stock === 'in-stock' ? 'border-sage-green/30 bg-sage-green/10' :
                product.stock === 'limited' ? 'border-primary/30 bg-primary/10' :
                'border-muted bg-muted'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  product.stock === 'in-stock' ? 'bg-sage-green' :
                  product.stock === 'limited' ? 'bg-primary' :
                  'bg-muted-foreground'
                }`} />
                <span className={`text-sm font-medium ${stockLabels[product.stock].color}`}>
                  {stockLabels[product.stock].text}
                </span>
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t("product.quantity")}
              </label>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 h-14 text-base"
                onClick={handleAddToCart}
                disabled={product.stock === 'out-of-stock'}
              >
                {t("product.addToCart")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 h-14 text-base"
                disabled={product.stock === 'out-of-stock'}
              >
                {t("product.buyNow")}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{t("product.carefulDelivery")}</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{t("product.returns")}</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{t("product.babySafe")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-medium text-foreground mb-8">
            {t("product.youMayLike")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                nameKey={p.nameKey}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                badge={p.badge}
                stock={p.stock}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
