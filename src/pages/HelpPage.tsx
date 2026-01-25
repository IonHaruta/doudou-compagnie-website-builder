import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "Cum pot urmări comanda mea?",
    answer: "După expedierea comenzii, veți primi un email cu numărul de urmărire. Puteți verifica starea livrării accesând link-ul din email sau contactându-ne direct.",
  },
  {
    question: "Care este politica de retur?",
    answer: "Acceptăm retururi în termen de 30 de zile de la primirea produsului. Produsele trebuie să fie în starea originală, cu etichetele atașate și în ambalajul original.",
  },
  {
    question: "Cum pot spăla doudou-ul?",
    answer: "Majoritatea doudou-urilor noastre pot fi spălate la mașină la 30°C, în ciclu delicat. Vă recomandăm să folosiți o pungă de protecție și să evitați uscătorul.",
  },
  {
    question: "Produsele sunt sigure pentru nou-născuți?",
    answer: "Da, toate produsele noastre sunt testate și certificate conform normelor europene de siguranță EN71 și sunt potrivite pentru utilizare de la naștere.",
  },
  {
    question: "Oferiți servicii de ambalare cadou?",
    answer: "Da! La finalizarea comenzii puteți selecta opțiunea de ambalare cadou. Oferim ambalaj premium cu panglică și un mesaj personalizat.",
  },
  {
    question: "Cât durează livrarea?",
    answer: "Livrarea standard durează 3-5 zile lucrătoare în România. Pentru comenzile plasate înainte de ora 14:00, expedierea se face în aceeași zi.",
  },
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@doudou-ro.com",
  },
  {
    icon: Phone,
    title: "Telefon",
    value: "+40 21 123 4567",
  },
  {
    icon: MapPin,
    title: "Adresă",
    value: "București, Sector 1, România",
  },
  {
    icon: Clock,
    title: "Program",
    value: "Luni - Vineri: 9:00 - 18:00",
  },
];

const HelpPage = () => {
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
              Ajutor
            </h1>
            <p className="text-muted-foreground">Suntem aici să vă ajutăm</p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-8">
              Întrebări Frecvente
            </h2>

            <Accordion type="single" collapsible className="max-w-3xl">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16 bg-soft-pink/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-8">
                Contactați-ne
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                  <MessageCircle className="w-4 h-4" />
                  Chat Live
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8"
            >
              <h3 className="font-display text-xl font-medium text-foreground mb-6">
                Trimiteți un mesaj
              </h3>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nume
                    </label>
                    <Input placeholder="Numele dvs." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="email@exemplu.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subiect
                  </label>
                  <Input placeholder="Cum vă putem ajuta?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mesaj
                  </label>
                  <Textarea 
                    placeholder="Descrieți problema sau întrebarea dvs..." 
                    rows={5}
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6">
                  Trimite Mesajul
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;