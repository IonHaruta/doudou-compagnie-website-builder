import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Mapping from GiftFinder options to ShopPage filter IDs
const ageMapping: Record<string, string> = {
  "0-6": "0-6",
  "6-12": "6-12",
  "1-3": "1-3",
  "3+": "3+",
};

const typeMapping: Record<string, string> = {
  "doudous": "doudous",
  "plush": "plush",
  "puppets": "puppets",
  "music-boxes": "music-boxes",
};

const budgetMapping: Record<string, string> = {
  "under-20": "under-20",
  "20-40": "20-40",
  "40-60": "40-60",
  "over-60": "over-60",
};

const colorMapping: Record<string, string> = {
  "roz": "roz",
  "albastru": "albastru",
  "bej": "bej",
  "multicolor": "multicolor",
};

const GiftFinder = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const steps = [
    {
      id: 1,
      question: t("gift.questionAge"),
      options: [
        { id: "0-6", label: t("age.0-6") },
        { id: "6-12", label: t("age.6-12") },
        { id: "1-3", label: t("age.1-3") },
        { id: "3+", label: t("age.3+") },
      ],
    },
    {
      id: 2,
      question: t("gift.questionType"),
      options: [
        { id: "doudous", label: t("productType.doudous") },
        { id: "plush", label: t("productType.plush") },
        { id: "puppets", label: t("productType.puppets") },
        { id: "music-boxes", label: t("productType.musicBoxes") },
      ],
    },
    {
      id: 3,
      question: t("gift.questionColor"),
      options: [
        { id: "roz", label: t("color.roz") },
        { id: "albastru", label: t("color.albastru") },
        { id: "bej", label: t("color.bej") },
        { id: "multicolor", label: t("color.multicolor") },
      ],
    },
    {
      id: 4,
      question: t("gift.questionBudget"),
      options: [
        { id: "under-20", label: t("budget.under20") },
        { id: "20-40", label: t("budget.20-40") },
        { id: "40-60", label: t("budget.40-60") },
        { id: "over-60", label: t("budget.over60") },
      ],
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    const newSelections = [...selectedOptions];
    newSelections[currentStep] = optionId;
    setSelectedOptions(newSelections);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFindGift = () => {
    const params = new URLSearchParams();
    
    // Age filter (step 0)
    if (selectedOptions[0] && ageMapping[selectedOptions[0]]) {
      params.set("age", ageMapping[selectedOptions[0]]);
    }
    
    // Type filter (step 1)
    if (selectedOptions[1] && typeMapping[selectedOptions[1]]) {
      params.set("type", typeMapping[selectedOptions[1]]);
    }
    
    // Color filter (step 2)
    if (selectedOptions[2] && colorMapping[selectedOptions[2]]) {
      params.set("color", colorMapping[selectedOptions[2]]);
    }
    
    // Budget filter (step 3)
    if (selectedOptions[3] && budgetMapping[selectedOptions[3]]) {
      params.set("budget", budgetMapping[selectedOptions[3]]);
    }
    
    navigate(`/magazin?${params.toString()}`);
  };

  return (
    <section id="gift-finder" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            {t("gift.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("gift.subtitle")}
          </p>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-3 mb-8"
        >
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : index < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id}
            </button>
          ))}
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-soft p-8 lg:p-10">
            <h3 className="font-display text-2xl font-medium text-foreground text-center mb-8">
              {steps[currentStep].question}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedOptions[currentStep] === option.id
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <Button
              onClick={currentStep === steps.length - 1 ? handleFindGift : handleNext}
              disabled={!selectedOptions[currentStep]}
              className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base"
            >
              {currentStep === steps.length - 1 ? t("gift.findDoudou") : t("gift.next")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftFinder;
