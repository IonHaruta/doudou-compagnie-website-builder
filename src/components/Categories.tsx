import { motion } from "framer-motion";
import categoryToys from "@/assets/category-toys.jpg";
import categoryBlankets from "@/assets/category-blankets.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

const categories = [
  {
    id: 1,
    name: "Jucării de Pluș",
    description: "Companioni blânzi și adorabili pentru bebelușul tău",
    image: categoryToys,
    count: "48 produse",
  },
  {
    id: 2,
    name: "Pături & Accesorii",
    description: "Confort și căldură pentru somn liniștit",
    image: categoryBlankets,
    count: "24 produse",
  },
  {
    id: 3,
    name: "Cutii Cadou",
    description: "Cadoul perfect pentru nou-născuți",
    image: categoryGifts,
    count: "16 produse",
  },
];

const Categories = () => {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-background">
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
            Explorează
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Colecțiile Noastre
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fiecare piesă este creată cu atenție la detalii și dragoste pentru cei mici
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="inline-block text-xs font-medium text-primary-foreground/80 uppercase tracking-wider mb-2">
                  {category.count}
                </span>
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-card mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-card/80 mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-card group-hover:gap-3 transition-all duration-300">
                  Explorează
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
