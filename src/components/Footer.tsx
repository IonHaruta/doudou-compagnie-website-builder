import { motion } from "framer-motion";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = {
    magazin: [
      { name: "Toate Produsele", href: "/magazin" },
      { name: t("shop.new"), href: "/magazin?filter=new" },
      { name: t("shop.bestseller"), href: "/magazin?filter=bestseller" },
      { name: t("shop.doudous"), href: "/magazin?filter=doudous" },
    ],
    colectii: [
      { name: "Boh'aime", href: "/colectii" },
      { name: "Iepuraș Floricică", href: "/colectii" },
      { name: t("shop.puppets"), href: "/magazin?filter=puppets" },
      { name: t("shop.musicBoxes"), href: "/magazin?filter=music-boxes" },
    ],
    ajutor: [
      { name: "Contact", href: "/ajutor" },
      { name: "Livrare", href: "/ajutor" },
      { name: "Returnări", href: "/ajutor" },
      { name: "FAQ", href: "/ajutor" },
    ],
    legal: [
      { name: "Termeni și Condiții", href: "#" },
      { name: "Confidențialitate", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  };

  return (
    <footer id="contact" className="bg-foreground text-card">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl font-medium italic mb-4">
                Doudou & Compagnie
              </h3>
              <p className="text-card/70 mb-6 text-sm leading-relaxed">
                Creatori de momente tandre din 1999. Jucării premium pentru bebeluși, 
                fabricate cu dragoste în Franța.
              </p>

              {/* Contact */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-card/70 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>București, România</span>
                </div>
                <div className="flex items-center gap-2 text-card/70 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+40 123 456 789</span>
                </div>
                <div className="flex items-center gap-2 text-card/70 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@doudou.ro</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-card/10 hover:bg-card/20 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-card/10 hover:bg-card/20 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm">{t("footer.shop")}</h4>
            <ul className="space-y-2">
              {footerLinks.magazin.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">{t("nav.collections")}</h4>
            <ul className="space-y-2">
              {footerLinks.colectii.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">{t("footer.help")}</h4>
            <ul className="space-y-2">
              {footerLinks.ajutor.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-card/70 hover:text-card transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-card/10">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <p className="text-xs text-card/50 text-center">
            © {currentYear} Doudou & Compagnie. {t("footer.allRights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
