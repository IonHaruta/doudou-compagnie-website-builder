import { motion } from "framer-motion";
import { Bookmark, Heart, Shield, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-nursery.jpg";

const OurStoryPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Bookmark,
      title: t("story.frenchDesign"),
      description: t("story.frenchDesignDesc"),
    },
    {
      icon: Heart,
      title: t("story.quality"),
      description: t("story.qualityDesc"),
    },
    {
      icon: Shield,
      title: t("story.safety"),
      description: t("story.safetyDesc"),
    },
    {
      icon: Leaf,
      title: t("story.ecoFriendly"),
      description: t("story.ecoFriendlyDesc"),
    },
  ];

  const timelineEvents = [
    { year: "1999", titleKey: "story.1999", descKey: "story.1999Desc" },
    { year: "2000", titleKey: "story.2000", descKey: "story.2000Desc" },
    { year: "2003", titleKey: "story.2003", descKey: "story.2003Desc" },
    { year: "2010", titleKey: "story.2010", descKey: "story.2010Desc" },
    { year: "2015", titleKey: "story.2015", descKey: "story.2015Desc" },
    { year: "2018", titleKey: "story.2018", descKey: "story.2018Desc" },
    { year: "2019", titleKey: "story.2019", descKey: "story.2019Desc" },
    { year: "2024", titleKey: "story.2024", descKey: "story.2024Desc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <img
          src={heroImage}
          alt="Doudou & Compagnie Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
              {t("story.title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("story.intro")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-soft-pink/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
              {t("story.values")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-soft-pink flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground text-center mb-12">
              {t("story.history")}
            </h2>

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-24 flex-shrink-0 text-right">
                    <span className="font-display text-xl font-medium text-primary">{event.year}</span>
                  </div>
                  <div className={`flex-1 pl-6 ${index < timelineEvents.length - 1 ? 'pb-8 border-l-2 border-primary/20' : ''}`}>
                    <h3 className="font-medium text-foreground mb-2">{t(event.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(event.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStoryPage;
