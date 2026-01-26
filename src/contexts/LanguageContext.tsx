import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ro" | "ru" | "en";

interface Translations {
  [key: string]: {
    ro: string;
    ru: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.shop": { ro: "Magazin", ru: "Магазин", en: "Shop" },
  "nav.collections": { ro: "Colecții", ru: "Коллекции", en: "Collections" },
  "nav.giftIdeas": { ro: "Idei Cadouri", ru: "Идеи подарков", en: "Gift Ideas" },
  "nav.ourStory": { ro: "Povestea Noastră", ru: "Наша история", en: "Our Story" },
  "nav.help": { ro: "Ajutor", ru: "Помощь", en: "Help" },
  
  // Shop categories
  "shop.new": { ro: "Noutăți", ru: "Новинки", en: "New Arrivals" },
  "shop.bestseller": { ro: "Cele mai vândute", ru: "Бестселлеры", en: "Bestsellers" },
  "shop.doudous": { ro: "Doudous", ru: "Дуду", en: "Doudous" },
  "shop.plush": { ro: "Jucării de Pluș", ru: "Плюшевые игрушки", en: "Plush Toys" },
  "shop.puppets": { ro: "Marionete", ru: "Марионетки", en: "Puppets" },
  "shop.musicBoxes": { ro: "Cutii Muzicale", ru: "Музыкальные шкатулки", en: "Music Boxes" },
  
  // Product page
  "product.inStock": { ro: "În stoc", ru: "В наличии", en: "In Stock" },
  "product.limitedStock": { ro: "Stoc limitat", ru: "Ограниченный запас", en: "Limited Stock" },
  "product.outOfStock": { ro: "Indisponibil", ru: "Нет в наличии", en: "Out of Stock" },
  "product.quantity": { ro: "Cantitate", ru: "Количество", en: "Quantity" },
  "product.addToCart": { ro: "Adaugă în Coș", ru: "Добавить в корзину", en: "Add to Cart" },
  "product.buyNow": { ro: "Cumpără Acum", ru: "Купить сейчас", en: "Buy Now" },
  "product.reviews": { ro: "Recenzii", ru: "Отзывы", en: "Reviews" },
  "product.carefulDelivery": { ro: "Livrare Atentă", ru: "Бережная доставка", en: "Careful Delivery" },
  "product.returns": { ro: "Returnări și Schimburi", ru: "Возврат и обмен", en: "Returns & Exchanges" },
  "product.babySafe": { ro: "Siguranță pentru Bebeluși", ru: "Безопасность для малышей", en: "Baby Safety" },
  "product.youMayLike": { ro: "Ți-ar putea plăcea și", ru: "Вам также может понравиться", en: "You May Also Like" },
  
  // Cart
  "cart.title": { ro: "Coșul Tău", ru: "Ваша корзина", en: "Your Cart" },
  "cart.empty": { ro: "Coșul tău este gol", ru: "Ваша корзина пуста", en: "Your cart is empty" },
  "cart.continueShopping": { ro: "Continuă cumpărăturile", ru: "Продолжить покупки", en: "Continue Shopping" },
  "cart.subtotal": { ro: "Subtotal", ru: "Подытог", en: "Subtotal" },
  "cart.shipping": { ro: "Livrare", ru: "Доставка", en: "Shipping" },
  "cart.total": { ro: "Total", ru: "Итого", en: "Total" },
  "cart.checkout": { ro: "Finalizează Comanda", ru: "Оформить заказ", en: "Checkout" },
  "cart.free": { ro: "Gratuit", ru: "Бесплатно", en: "Free" },
  
  // Search
  "search.placeholder": { ro: "Caută produse...", ru: "Искать товары...", en: "Search products..." },
  "search.noResults": { ro: "Nu s-au găsit rezultate", ru: "Результатов не найдено", en: "No results found" },
  
  // Common
  "common.home": { ro: "Acasă", ru: "Главная", en: "Home" },
  "common.new": { ro: "Nou", ru: "Новинка", en: "New" },
  "common.bestseller": { ro: "Cel mai vândut", ru: "Бестселлер", en: "Bestseller" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ro");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
