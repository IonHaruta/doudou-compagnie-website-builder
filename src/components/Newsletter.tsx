import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 lg:py-32 bg-primary/10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Newsletter
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Abonează-te la Newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Fii primul care află despre noile colecții, oferte speciale și 
            sfaturi pentru părinți. Promitem să nu trimitem spam!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Adresa ta de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 px-6 bg-card border-border focus:border-primary text-base rounded-xl"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Send className="w-4 h-4 mr-2" />
              Abonează-te
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6">
            Prin abonare, ești de acord cu{" "}
            <a href="#" className="text-primary hover:underline">
              Termenii și Condițiile
            </a>{" "}
            noastre.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
