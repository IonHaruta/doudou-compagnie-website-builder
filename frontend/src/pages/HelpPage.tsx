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
import { useLanguage } from "@/contexts/LanguageContext";

const HelpPage = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq.tracking"),
      answer: t("faq.trackingAnswer"),
    },
    {
      question: t("faq.returns"),
      answer: t("faq.returnsAnswer"),
    },
    {
      question: t("faq.washing"),
      answer: t("faq.washingAnswer"),
    },
    {
      question: t("faq.newborn"),
      answer: t("faq.newbornAnswer"),
    },
    {
      question: t("faq.giftWrap"),
      answer: t("faq.giftWrapAnswer"),
    },
    {
      question: t("faq.delivery"),
      answer: t("faq.deliveryAnswer"),
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: t("help.email"),
      value: "contact@doudou-ro.com",
    },
    {
      icon: Phone,
      title: t("help.phone"),
      value: "+40 21 123 4567",
    },
    {
      icon: MapPin,
      title: t("help.address"),
      value: "București, Sector 1, România",
    },
    {
      icon: Clock,
      title: t("help.hours"),
      value: t("help.hoursValue"),
    },
  ];

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
              {t("help.title")}
            </h1>
            <p className="text-muted-foreground">{t("help.subtitle")}</p>
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
              {t("help.faq")}
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
                {t("help.contact")}
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
                  {t("help.liveChat")}
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
                {t("help.sendMessage")}
              </h3>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("help.name")}
                    </label>
                    <Input placeholder={t("help.namePlaceholder")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("help.email")}
                    </label>
                    <Input type="email" placeholder="email@exemplu.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("help.subject")}
                  </label>
                  <Input placeholder={t("help.subjectPlaceholder")} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("help.message")}
                  </label>
                  <Textarea 
                    placeholder={t("help.messagePlaceholder")} 
                    rows={5}
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6">
                  {t("help.send")}
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
