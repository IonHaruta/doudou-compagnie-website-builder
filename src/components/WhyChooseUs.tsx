import { motion } from "framer-motion";
import { Award, Shield, Gift, Truck } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Calitate Premium",
    description: "Materiale certificate, moi și durabile",
  },
  {
    icon: Shield,
    title: "Siguranță Bebeluș",
    description: "Norme CE, testate și aprobate",
  },
  {
    icon: Gift,
    title: "Ambalaj Cadou",
    description: "Ofert la cerere",
  },
  {
    icon: Truck,
    title: "Livrare Atentă",
    description: "Expediere rapidă și urmărită",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
            De ce să ne alegi pe noi?
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-soft-pink flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
