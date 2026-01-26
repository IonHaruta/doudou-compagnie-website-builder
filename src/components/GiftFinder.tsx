import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    question: "Pentru ce vârstă?",
    options: ["0-6 luni", "6-12 luni", "1-3 ani", "3+ ani"],
  },
  {
    id: 2,
    question: "Ce tip de jucărie?",
    options: ["Pluș", "Marionetă", "Cutie muzicală", "Set cadou"],
  },
  {
    id: 3,
    question: "Ce culoare preferi?",
    options: ["Roz", "Albastru", "Bej/Crem", "Multicolor"],
  },
  {
    id: 4,
    question: "Care este bugetul?",
    options: ["Sub €20", "€20-€30", "€30-€50", "Peste €50"],
  },
];

// Mapping from GiftFinder options to ShopPage filter IDs
const ageMapping: Record<string, string> = {
  "0-6 luni": "0-6",
  "6-12 luni": "6-12",
  "1-3 ani": "1-3",
  "3+ ani": "3+",
};

const typeMapping: Record<string, string> = {
  "Pluș": "plush",
  "Marionetă": "puppets",
  "Cutie muzicală": "music-boxes",
  "Set cadou": "doudous",
};

const budgetMapping: Record<string, string> = {
  "Sub €20": "under-20",
  "€20-€30": "20-40",
  "€30-€50": "40-60",
  "Peste €50": "over-60",
};

const GiftFinder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    const newSelections = [...selectedOptions];
    newSelections[currentStep] = option;
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
            Găsește Cadoul Perfect
          </h2>
          <p className="text-muted-foreground">
            Răspunde la câteva întrebări pentru a găsi doudoul ideal
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
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedOptions[currentStep] === option
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <Button
              onClick={currentStep === steps.length - 1 ? handleFindGift : handleNext}
              disabled={!selectedOptions[currentStep]}
              className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base"
            >
              {currentStep === steps.length - 1 ? "Găsește Doudoul Meu" : "Continuă"}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftFinder;
