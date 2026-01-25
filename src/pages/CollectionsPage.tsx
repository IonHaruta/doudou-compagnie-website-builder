import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import collectionBohaime from "@/assets/collection-bohaime.jpg";
import collectionFloricica from "@/assets/collection-floricica.jpg";
import collectionMarionete from "@/assets/collection-marionete.jpg";
import collectionAnniversary from "@/assets/collection-anniversary.jpg";
import collectionClairLune from "@/assets/collection-clair-lune.jpg";
import collectionOrganic from "@/assets/collection-organic.jpg";

const collections = [
  {
    id: 1,
    name: "Boh'aime",
    description: "O colecție boemă și poetică pentru visători",
    count: 24,
    image: collectionBohaime,
  },
  {
    id: 2,
    name: "Iepuraș Floricică",
    description: "Iepurași moi împodobiți cu flori delicate",
    count: 18,
    image: collectionFloricica,
  },
  {
    id: 3,
    name: "Marionetele",
    description: "Marionete pentru a spune povești magice",
    count: 32,
    image: collectionMarionete,
  },
  {
    id: 4,
    name: "Aniversare DOUDOU®",
    description: "Colecție specială pentru aniversarea de 25 de ani",
    count: 12,
    image: collectionAnniversary,
  },
  {
    id: 5,
    name: "Clair de Lune",
    description: "Doudous luminescente pentru nopți liniștite",
    count: 15,
    image: collectionClairLune,
  },
  {
    id: 6,
    name: "Colecția Organică",
    description: "Bumbac organic certificat, blând pentru bebeluș și planetă",
    count: 20,
    image: collectionOrganic,
  },
];

const CollectionsPage = () => {
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
              Colecții
            </h1>
            <p className="text-muted-foreground">Explorați universurile noastre fermecate</p>
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
                to={`/colectii/${collection.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl block"
              >
                {/* Image */}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-card mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-card/80 mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-card/70 text-sm">
                    <span>{collection.count} rezultate</span>
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