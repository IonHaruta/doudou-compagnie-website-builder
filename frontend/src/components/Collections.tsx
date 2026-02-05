import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import collectionBohaime from "@/assets/collection-bohaime.jpg";
import collectionFloricica from "@/assets/collection-floricica.jpg";
import collectionMarionete from "@/assets/collection-marionete.jpg";

const Collections = () => {
  const { t } = useLanguage();

  const collections = [
    {
      id: 1,
      nameKey: "collection.bohaime",
      descriptionKey: "collections.bohaime",
      count: 24,
      image: collectionBohaime,
    },
    {
      id: 2,
      nameKey: "collection.floricica",
      descriptionKey: "collections.floricica",
      count: 18,
      image: collectionFloricica,
    },
    {
      id: 3,
      nameKey: "collection.marionete",
      descriptionKey: "collections.marionete",
      count: 32,
      image: collectionMarionete,
    },
  ];

  return (
    <section id="collections" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground italic mb-4">
            {t("collections.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("collections.subtitle")}
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.id}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
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
                <p className="text-sm text-card/80 mb-2">
                  {t(collection.descriptionKey)}
                </p>
                <span className="text-xs text-card/60">
                  {collection.count} {t("common.results")}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
