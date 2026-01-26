import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-nursery.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Doudou & Compagnie - Camera bebelușului"
          className="w-full h-full object-cover"
        />
        {/* Light warm overlay for soft effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              asChild
              size="lg" 
              className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              <Link to="/magazin">{t("hero.cta")}</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 border-primary text-primary hover:bg-primary/5 rounded-full"
            >
              <Link to="/colectii">{t("hero.collections")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
