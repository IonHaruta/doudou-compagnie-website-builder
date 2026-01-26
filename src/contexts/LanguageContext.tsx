import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  "shop.filters": { ro: "Filtre", ru: "Фильтры", en: "Filters" },
  "shop.productType": { ro: "Tip produs?", ru: "Тип продукта?", en: "Product type?" },
  "shop.budget": { ro: "Bugetul tău?", ru: "Ваш бюджет?", en: "Your budget?" },
  "shop.age": { ro: "Pentru ce vârstă?", ru: "Для какого возраста?", en: "For what age?" },
  "shop.color": { ro: "Culoare?", ru: "Цвет?", en: "Color?" },
  "shop.results": { ro: "rezultate", ru: "результатов", en: "results" },
  "shop.sortNewest": { ro: "Cele mai noi", ru: "Новейшие", en: "Newest" },
  "shop.sortPriceAsc": { ro: "Preț crescător", ru: "Цена по возрастанию", en: "Price: Low to High" },
  "shop.sortPriceDesc": { ro: "Preț descrescător", ru: "Цена по убыванию", en: "Price: High to Low" },
  "shop.sortPopular": { ro: "Popularitate", ru: "Популярность", en: "Popularity" },
  "shop.noResults": { ro: "Nu am găsit produse cu filtrele selectate.", ru: "Товары с выбранными фильтрами не найдены.", en: "No products found with selected filters." },
  "shop.resetFilters": { ro: "Resetează filtrele", ru: "Сбросить фильтры", en: "Reset filters" },
  
  // Hero
  "hero.title": { ro: "Doudous care consolează", ru: "Дуду, которые утешают", en: "Comforting Doudous" },
  "hero.subtitle": { ro: "Creatori de momente tandre de 25 de ani", ru: "Создаём нежные моменты уже 25 лет", en: "Creating tender moments for 25 years" },
  "hero.cta": { ro: "Descoperă Colecția", ru: "Открыть коллекцию", en: "Discover Collection" },
  "hero.collections": { ro: "Colecții", ru: "Коллекции", en: "Collections" },
  
  // Featured Products
  "featured.title": { ro: "Creațiile Noastre Vedetă", ru: "Наши хиты продаж", en: "Our Star Creations" },
  "featured.subtitle": { ro: "Companioni moi și consolatori pentru fiecare etapă", ru: "Мягкие утешители для каждого этапа", en: "Soft companions for every stage" },
  "featured.viewAll": { ro: "Vezi Tot", ru: "Смотреть все", en: "View All" },
  
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
  "product.notFound": { ro: "Produsul nu a fost găsit", ru: "Товар не найден", en: "Product not found" },
  "product.backToShop": { ro: "Înapoi la magazin", ru: "Вернуться в магазин", en: "Back to shop" },
  "product.addedToCart": { ro: "Adăugat în coș", ru: "Добавлено в корзину", en: "Added to cart" },
  
  // Cart
  "cart.title": { ro: "Coșul Tău", ru: "Ваша корзина", en: "Your Cart" },
  "cart.empty": { ro: "Coșul tău este gol", ru: "Ваша корзина пуста", en: "Your cart is empty" },
  "cart.addProducts": { ro: "Adaugă produse în coș pentru a continua.", ru: "Добавьте товары в корзину, чтобы продолжить.", en: "Add products to your cart to continue." },
  "cart.continueShopping": { ro: "Continuă cumpărăturile", ru: "Продолжить покупки", en: "Continue Shopping" },
  "cart.subtotal": { ro: "Subtotal", ru: "Подытог", en: "Subtotal" },
  "cart.shipping": { ro: "Livrare", ru: "Доставка", en: "Shipping" },
  "cart.total": { ro: "Total", ru: "Итого", en: "Total" },
  "cart.checkout": { ro: "Finalizează Comanda", ru: "Оформить заказ", en: "Checkout" },
  "cart.free": { ro: "Gratuit", ru: "Бесплатно", en: "Free" },
  "cart.orderSummary": { ro: "Sumar comandă", ru: "Сводка заказа", en: "Order Summary" },
  "cart.products": { ro: "produse", ru: "товаров", en: "products" },
  
  // Search
  "search.title": { ro: "Caută produse", ru: "Поиск товаров", en: "Search products" },
  "search.placeholder": { ro: "Caută produse...", ru: "Искать товары...", en: "Search products..." },
  "search.noResults": { ro: "Nu s-au găsit rezultate pentru", ru: "Результатов не найдено для", en: "No results found for" },
  
  // Common
  "common.home": { ro: "Acasă", ru: "Главная", en: "Home" },
  "common.new": { ro: "Nou", ru: "Новинка", en: "New" },
  "common.bestseller": { ro: "Cel mai vândut", ru: "Бестселлер", en: "Bestseller" },
  
  // Why Choose Us
  "why.title": { ro: "De Ce Doudou & Compagnie?", ru: "Почему Doudou & Compagnie?", en: "Why Doudou & Compagnie?" },
  "why.quality": { ro: "Calitate Premium", ru: "Премиум качество", en: "Premium Quality" },
  "why.qualityDesc": { ro: "Materiale selectate cu grijă pentru pielea sensibilă", ru: "Материалы, отобранные для чувствительной кожи", en: "Materials carefully selected for sensitive skin" },
  "why.safety": { ro: "Siguranță Certificată", ru: "Сертифицированная безопасность", en: "Certified Safety" },
  "why.safetyDesc": { ro: "Toate produsele respectă normele CE de la 0 luni", ru: "Все продукты соответствуют нормам CE с 0 месяцев", en: "All products meet CE standards from 0 months" },
  "why.handmade": { ro: "Design Francez", ru: "Французский дизайн", en: "French Design" },
  "why.handmadeDesc": { ro: "Create cu dragoste în atelierele noastre din Franța", ru: "Созданы с любовью в наших мастерских во Франции", en: "Created with love in our French workshops" },
  "why.gift": { ro: "Cadou Perfect", ru: "Идеальный подарок", en: "Perfect Gift" },
  "why.giftDesc": { ro: "Ambalaj elegant și personalizabil pentru orice ocazie", ru: "Элегантная упаковка для любого случая", en: "Elegant packaging for any occasion" },
  
  // Gift Finder
  "gift.title": { ro: "Găsește Cadoul Perfect", ru: "Найдите идеальный подарок", en: "Find the Perfect Gift" },
  "gift.subtitle": { ro: "Răspunde la câteva întrebări și te ajutăm să găsești doudou-ul ideal", ru: "Ответьте на несколько вопросов, и мы поможем найти идеального дуду", en: "Answer a few questions and we'll help you find the ideal doudou" },
  "gift.start": { ro: "Începe", ru: "Начать", en: "Start" },
  "gift.back": { ro: "Înapoi", ru: "Назад", en: "Back" },
  "gift.next": { ro: "Următorul", ru: "Далее", en: "Next" },
  "gift.findDoudou": { ro: "Găsește Doudoul Meu", ru: "Найти моего Дуду", en: "Find My Doudou" },
  "gift.step": { ro: "Pasul", ru: "Шаг", en: "Step" },
  "gift.of": { ro: "din", ru: "из", en: "of" },
  
  // Footer
  "footer.newsletter": { ro: "Alătură-te Familiei Doudou", ru: "Присоединяйтесь к семье Дуду", en: "Join the Doudou Family" },
  "footer.newsletterDesc": { ro: "Primește noutățile și ofertele noastre exclusive", ru: "Получайте наши новости и эксклюзивные предложения", en: "Receive our news and exclusive offers" },
  "footer.emailPlaceholder": { ro: "Adresa ta de email", ru: "Ваш email", en: "Your email address" },
  "footer.subscribe": { ro: "Abonează-te", ru: "Подписаться", en: "Subscribe" },
  "footer.shop": { ro: "Magazin", ru: "Магазин", en: "Shop" },
  "footer.about": { ro: "Despre Noi", ru: "О нас", en: "About Us" },
  "footer.help": { ro: "Ajutor", ru: "Помощь", en: "Help" },
  "footer.allRights": { ro: "Toate drepturile rezervate", ru: "Все права защищены", en: "All rights reserved" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ro";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

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
