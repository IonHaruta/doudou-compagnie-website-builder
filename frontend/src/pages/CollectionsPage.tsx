import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
// Using placeholder images - these should be replaced with actual category images
import collectionBohaime from "@/assets/collection-bohaime.jpg";
import collectionFloricica from "@/assets/collection-floricica.jpg";
import collectionMarionete from "@/assets/collection-marionete.jpg";
import collectionAnniversary from "@/assets/collection-anniversary.jpg";
import collectionClairLune from "@/assets/collection-clair-lune.jpg";
import collectionOrganic from "@/assets/collection-organic.jpg";
import categoryBlankets from "@/assets/category-blankets.jpg";
import categoryToys from "@/assets/category-toys.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

const CollectionsPage = () => {
  const { t } = useLanguage();

  const collections = [
    {
      id: "crocodiles",
      nameKey: "collection.crocodiles",
      descriptionKey: "collections.crocodiles",
      count: 12,
      image: collectionBohaime,
    },
    {
      id: "bears",
      nameKey: "collection.bears",
      descriptionKey: "collections.bears",
      count: 28,
      image: collectionFloricica,
    },
    {
      id: "hippos",
      nameKey: "collection.hippos",
      descriptionKey: "collections.hippos",
      count: 8,
      image: collectionMarionete,
    },
    {
      id: "elephants",
      nameKey: "collection.elephants",
      descriptionKey: "collections.elephants",
      count: 15,
      image: collectionAnniversary,
    },
    {
      id: "puppies",
      nameKey: "collection.puppies",
      descriptionKey: "collections.puppies",
      count: 18,
      image: collectionClairLune,
    },
    {
      id: "kittens",
      nameKey: "collection.kittens",
      descriptionKey: "collections.kittens",
      count: 14,
      image: collectionOrganic,
    },
    {
      id: "dolls",
      nameKey: "collection.dolls",
      descriptionKey: "collections.dolls",
      count: 22,
      image: categoryGifts,
    },
    {
      id: "newborn",
      nameKey: "collection.newborn",
      descriptionKey: "collections.newborn",
      count: 35,
      image: categoryToys,
    },
    {
      id: "blankets",
      nameKey: "collection.blankets",
      descriptionKey: "collections.blankets",
      count: 16,
      image: categoryBlankets,
    },
  ];

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
              {t("collections.title")}
            </h1>
            <p className="text-muted-foreground">{t("collections.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/catalog?collection=${collection.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl block"
              >
                {/* Image */}
                <img
                  src={collection.image}
                  alt={t(collection.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-card mb-1">
                    {t(collection.nameKey)}
                  </h3>
                  <p className="text-sm text-card/80 mb-3">
                    {t(collection.descriptionKey)}
                  </p>
                  <div className="flex items-center gap-2 text-card/70 text-sm">
                    <span>{collection.count} {t("common.results")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CollectionsPage;
