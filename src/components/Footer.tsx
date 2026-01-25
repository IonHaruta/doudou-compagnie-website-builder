import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    magazin: [
      { name: "Jucării de Pluș", href: "#" },
      { name: "Pături & Accesorii", href: "#" },
      { name: "Cutii Cadou", href: "#" },
      { name: "Noutăți", href: "#" },
      { name: "Oferte Speciale", href: "#" },
    ],
    informatii: [
      { name: "Despre Noi", href: "#about" },
      { name: "Livrare & Returnare", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Blog", href: "#" },
    ],
    legal: [
      { name: "Termeni și Condiții", href: "#" },
      { name: "Politica de Confidențialitate", href: "#" },
      { name: "Politica de Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-card">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl font-semibold mb-4">
                Doudou & Compagnie
              </h3>
              <p className="text-card/70 mb-6 max-w-sm leading-relaxed">
                Creăm jucării premium pentru bebeluși din 1974. 
                Calitate franceză și dragoste pentru cei mici.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-card/70">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">București, România</span>
                </div>
                <div className="flex items-center gap-3 text-card/70">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">+40 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-card/70">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">contact@doudou-ro.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-card/10 hover:bg-card/20 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Magazin</h4>
            <ul className="space-y-3">
              {footerLinks.magazin.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-card/70 hover:text-card transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Informații</h4>
            <ul className="space-y-3">
              {footerLinks.informatii.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-card/70 hover:text-card transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-card/70 hover:text-card transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-card/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-card/60">
              © {currentYear} Doudou & Compagnie. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-6 opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
