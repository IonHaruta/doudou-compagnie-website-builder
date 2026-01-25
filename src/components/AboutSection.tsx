import { motion } from "framer-motion";
import { Shield, Heart, Star, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Siguranță Garantată",
    description:
      "Toate produsele noastre sunt testate și certificate conform standardelor europene de siguranță pentru copii.",
  },
  {
    icon: Heart,
    title: "Făcute cu Dragoste",
    description:
      "Fiecare jucărie este creată cu atenție la detalii și pasiune pentru a aduce bucurie copiilor.",
  },
  {
    icon: Star,
    title: "Calitate Premium",
    description:
      "Folosim doar materiale de cea mai înaltă calitate, moi și delicate pentru pielea sensibilă a bebelușilor.",
  },
  {
    icon: Award,
    title: "Tradiție Franceză",
    description:
      "Din 1974, creăm jucării care devin companionii preferați ai copiilor din întreaga lume.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Despre Noi
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Povestea Doudou & Compagnie
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              De peste 50 de ani, Doudou & Compagnie creează jucării speciale 
              pentru bebeluși și copii mici. Fondată în Franța, compania noastră 
              s-a dedicat producerii celor mai blânde și mai sigure jucării care 
              devin primii prieteni ai celor mici.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fiecare piesă din colecția noastră este rezultatul unei combinații 
              perfecte între tradiția artizanală franceză și cele mai înalte 
              standarde de siguranță modernă.
            </p>

            {/* Stats */}
            <div className="flex gap-8 lg:gap-12">
              <div>
                <div className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
                  50+
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Ani de Experiență
                </p>
              </div>
              <div>
                <div className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
                  1M+
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Familii Fericite
                </p>
              </div>
              <div>
                <div className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
                  60+
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Țări în Lume
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-card rounded-2xl shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
