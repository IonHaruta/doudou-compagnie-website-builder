import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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
  "nav.catalog": { ro: "Catalog", ru: "Каталог", en: "Catalog" },
  "nav.collections": { ro: "Colecții", ru: "Коллекции", en: "Collections" },
  "nav.giftIdeas": { ro: "Idei Cadouri", ru: "Идеи подарков", en: "Gift Ideas" },
  "nav.ourStory": { ro: "Povestea Noastră", ru: "Наша история", en: "Our Story" },
  "nav.help": { ro: "Ajutor", ru: "Помощь", en: "Help" },
  
  // Catalog categories
  "catalog.all": { ro: "Toate Produsele", ru: "Все товары", en: "All Products" },
  "catalog.new": { ro: "Produse Noi", ru: "Новинки", en: "New Products" },
  "catalog.byAge": { ro: "După Vârstă", ru: "По возрасту", en: "By Age" },
  "catalog.byGender": { ro: "Pentru Băieți / Fete", ru: "Для мальчиков / Девочек", en: "For Boys / Girls" },
  "catalog.forBoys": { ro: "Pentru Băieți", ru: "Для мальчиков", en: "For Boys" },
  "catalog.forGirls": { ro: "Pentru Fete", ru: "Для девочек", en: "For Girls" },
  "catalog.sale": { ro: "Reduceri", ru: "Скидки", en: "Sale" },
  
  // Shop categories (legacy support)
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
  "shop.gender": { ro: "Gen?", ru: "Пол?", en: "Gender?" },
  
  // Gender options
  "gender.boy": { ro: "Băieți", ru: "Мальчики", en: "Boys" },
  "gender.girl": { ro: "Fete", ru: "Девочки", en: "Girls" },
  "gender.unisex": { ro: "Unisex", ru: "Унисекс", en: "Unisex" },
  
  // Product Types
  "productType.doudous": { ro: "Doudous", ru: "Дуду", en: "Doudous" },
  "productType.plush": { ro: "Jucării de Pluș", ru: "Плюшевые игрушки", en: "Plush Toys" },
  "productType.puppets": { ro: "Marionete", ru: "Марионетки", en: "Puppets" },
  "productType.musicBoxes": { ro: "Cutii Muzicale", ru: "Музыкальные шкатулки", en: "Music Boxes" },
  
  // Age Ranges
  "age.0-6": { ro: "0-6 luni", ru: "0-6 месяцев", en: "0-6 months" },
  "age.6-12": { ro: "6-12 luni", ru: "6-12 месяцев", en: "6-12 months" },
  "age.1-3": { ro: "1-3 ani", ru: "1-3 года", en: "1-3 years" },
  "age.3+": { ro: "3+ ani", ru: "3+ лет", en: "3+ years" },
  
  // Colors
  "color.roz": { ro: "Roz", ru: "Розовый", en: "Pink" },
  "color.albastru": { ro: "Albastru", ru: "Голубой", en: "Blue" },
  "color.bej": { ro: "Bej/Crem", ru: "Бежевый/Кремовый", en: "Beige/Cream" },
  "color.gri": { ro: "Gri", ru: "Серый", en: "Grey" },
  "color.multicolor": { ro: "Multicolor", ru: "Разноцветный", en: "Multicolor" },
  
  // Budget
  "budget.under20": { ro: "<20 euro", ru: "<20 евро", en: "<20 euro" },
  "budget.20-40": { ro: "20-40 euro", ru: "20-40 евро", en: "20-40 euro" },
  "budget.40-60": { ro: "40-60 euro", ru: "40-60 евро", en: "40-60 euro" },
  "budget.over60": { ro: ">60 euro", ru: ">60 евро", en: ">60 euro" },
  
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
  
  // Product Names
  "product.pinkBunny": { ro: "Iepuraș Bonbon Roz", ru: "Розовый зайчик Бонбон", en: "Pink Bonbon Bunny" },
  "product.greyBear": { ro: "Urs Lună Plină", ru: "Мишка Полная Луна", en: "Full Moon Bear" },
  "product.wolfPuppet": { ro: "Marionetă Lup", ru: "Марионетка Волк", en: "Wolf Puppet" },
  "product.musicBox": { ro: "Cutie Muzicală Stea", ru: "Музыкальная шкатулка Звезда", en: "Star Music Box" },
  "product.deer": { ro: "Pui de Cerb Boh'aime", ru: "Олененок Богема", en: "Boh'aime Baby Deer" },
  "product.bunny": { ro: "Iepuraș Floricică", ru: "Зайчик Цветочек", en: "Flower Bunny" },
  "product.elephant": { ro: "Elefant Boh'aime", ru: "Слон Богема", en: "Boh'aime Elephant" },
  "product.bear": { ro: "Urs Bonbon Maro", ru: "Мишка Бонбон Коричневый", en: "Brown Bonbon Bear" },
  "product.puppy": { ro: "Cățeluș Dormitor", ru: "Спящий щенок", en: "Sleepy Puppy" },
  
  // Product Descriptions
  "product.pinkBunny.desc": { 
    ro: "Un adorabil iepuraș roz, perfect pentru cei mai mici. Fabricat din materiale moi și sigure pentru bebeluși.", 
    ru: "Очаровательный розовый зайчик, идеальный для самых маленьких. Изготовлен из мягких и безопасных материалов.", 
    en: "An adorable pink bunny, perfect for the little ones. Made from soft and baby-safe materials." 
  },
  "product.greyBear.desc": { 
    ro: "Un ursuleț gri cu expresie blândă, perfect pentru îmbrățișări. Material premium, hipoalergenic.", 
    ru: "Серый мишка с нежным выражением, идеальный для объятий. Премиум гипоаллергенный материал.", 
    en: "A grey bear with a gentle expression, perfect for hugs. Premium hypoallergenic material." 
  },
  "product.wolfPuppet.desc": { 
    ro: "Marionetă de mână în formă de lup, perfectă pentru jocuri creative și povești.", 
    ru: "Ручная марионетка в форме волка, идеальная для творческих игр и историй.", 
    en: "A wolf hand puppet, perfect for creative play and storytelling." 
  },
  "product.musicBox.desc": { 
    ro: "Cutie muzicală delicată cu melodie liniștitoare. Perfect pentru adormit bebelușii.", 
    ru: "Нежная музыкальная шкатулка с успокаивающей мелодией. Идеально для засыпания малышей.", 
    en: "Delicate music box with a soothing melody. Perfect for putting babies to sleep." 
  },
  "product.deer.desc": { 
    ro: "Un pui de cerb adorabil din colecția Boh'aime, cu material moale și detalii fine.", 
    ru: "Очаровательный олененок из коллекции Богема с мягким материалом и изящными деталями.", 
    en: "An adorable baby deer from the Boh'aime collection, with soft material and fine details." 
  },
  "product.bunny.desc": { 
    ro: "Iepuraș cu imprimeu floral, moale și perfect pentru bebeluși.", 
    ru: "Зайчик с цветочным принтом, мягкий и идеальный для малышей.", 
    en: "Bunny with floral print, soft and perfect for babies." 
  },
  "product.elephant.desc": { 
    ro: "Elefant mare din colecția Boh'aime, ideal pentru decorarea camerei sau pentru joacă.", 
    ru: "Большой слон из коллекции Богема, идеальный для декора комнаты или игр.", 
    en: "Large elephant from the Boh'aime collection, ideal for room decoration or play." 
  },
  "product.bear.desc": { 
    ro: "Ursuleț premium din colecția Bonbon, cu materiale de cea mai înaltă calitate.", 
    ru: "Премиум мишка из коллекции Бонбон с материалами высочайшего качества.", 
    en: "Premium bear from the Bonbon collection, with the highest quality materials." 
  },
  "product.puppy.desc": { 
    ro: "Un cățeluș adorabil în poziție de somn, perfect pentru copiii mici.", 
    ru: "Очаровательный щенок в позе сна, идеальный для маленьких детей.", 
    en: "An adorable puppy in sleeping position, perfect for young children." 
  },
  
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
  "common.sale": { ro: "Reducere", ru: "Скидка", en: "Sale" },
  "common.productsFound": { ro: "produse găsite", ru: "товаров найдено", en: "products found" },
  "common.results": { ro: "produse", ru: "товаров", en: "products" },
  
  // Shop filters
  "shop.collections": { ro: "Colecții", ru: "Коллекции", en: "Collections" },
  "shop.allProducts": { ro: "Toate produsele noastre", ru: "Все наши товары", en: "All our products" },
  
  // Why Choose Us
  "why.title": { ro: "De ce să ne alegi pe noi?", ru: "Почему выбирают нас?", en: "Why Choose Us?" },
  "why.quality": { ro: "Calitate Premium", ru: "Премиум качество", en: "Premium Quality" },
  "why.qualityDesc": { ro: "Materiale certificate, moi și durabile", ru: "Сертифицированные материалы, мягкие и прочные", en: "Certified materials, soft and durable" },
  "why.safety": { ro: "Siguranță Bebeluș", ru: "Безопасность для малыша", en: "Baby Safety" },
  "why.safetyDesc": { ro: "Norme CE, testate și aprobate", ru: "Нормы CE, протестировано и одобрено", en: "CE standards, tested and approved" },
  "why.gift": { ro: "Ambalaj Cadou", ru: "Подарочная упаковка", en: "Gift Wrapping" },
  "why.giftDesc": { ro: "Oferit la cerere", ru: "Предоставляется по запросу", en: "Available upon request" },
  "why.delivery": { ro: "Livrare Atentă", ru: "Бережная доставка", en: "Careful Delivery" },
  "why.deliveryDesc": { ro: "Expediere rapidă și urmărită", ru: "Быстрая отслеживаемая доставка", en: "Fast tracked shipping" },
  
  // Footer location
  "footer.location": { ro: "București, România", ru: "Бухарест, Румыния", en: "Bucharest, Romania" },
  
  // Collection categories (animal-based)
  "collection.crocodiles": { ro: "Crocodili", ru: "Крокодилы", en: "Crocodiles" },
  "collection.bears": { ro: "Ursuleți", ru: "Мишки", en: "Bears" },
  "collection.hippos": { ro: "Hipopotami", ru: "Бегемоты", en: "Hippos" },
  "collection.elephants": { ro: "Elefanți", ru: "Слоны", en: "Elephants" },
  "collection.puppies": { ro: "Cățeluși", ru: "Щенки", en: "Puppies" },
  "collection.kittens": { ro: "Pisicuțe", ru: "Котята", en: "Kittens" },
  "collection.dolls": { ro: "Păpuși", ru: "Куклы", en: "Dolls" },
  "collection.newborn": { ro: "New Born", ru: "Для новорождённых", en: "New Born" },
  "collection.blankets": { ro: "Păturică", ru: "Пледики", en: "Blankets" },
  
  // Collection descriptions
  "collections.crocodiles": { ro: "Crocodili prietenoși și moi pentru aventuri pline de imaginație", ru: "Дружелюбные и мягкие крокодилы для воображаемых приключений", en: "Friendly and soft crocodiles for imaginative adventures" },
  "collections.bears": { ro: "Ursuleți clasici de pluș pentru îmbrățișări tandre", ru: "Классические плюшевые мишки для нежных объятий", en: "Classic plush bears for tender hugs" },
  "collections.hippos": { ro: "Hipopotami adorabili, perfecti pentru cei mici", ru: "Очаровательные бегемотики, идеальные для малышей", en: "Adorable hippos, perfect for little ones" },
  "collections.elephants": { ro: "Elefanți majestici din materiale premium", ru: "Величественные слоны из премиум материалов", en: "Majestic elephants made from premium materials" },
  "collections.puppies": { ro: "Cățeluși jucăuși pentru prietenii veritabili", ru: "Игривые щенки для настоящей дружбы", en: "Playful puppies for true friendship" },
  "collections.kittens": { ro: "Pisicuțe moi și drăgălașe", ru: "Мягкие и милые котята", en: "Soft and adorable kittens" },
  "collections.dolls": { ro: "Păpuși cu caracter și stil unic", ru: "Куклы с характером и уникальным стилем", en: "Dolls with character and unique style" },
  "collections.newborn": { ro: "Produse speciale pentru nou-născuți, sigure de la naștere", ru: "Специальные товары для новорождённых, безопасные с рождения", en: "Special products for newborns, safe from birth" },
  "collections.blankets": { ro: "Păturici moi și confortabile pentru bebeluși", ru: "Мягкие и удобные пледики для малышей", en: "Soft and cozy blankets for babies" },
  
  // Gift Finder
  "gift.title": { ro: "Găsește Cadoul Perfect", ru: "Найдите идеальный подарок", en: "Find the Perfect Gift" },
  "gift.subtitle": { ro: "Răspunde la câteva întrebări și te ajutăm să găsești doudou-ul ideal", ru: "Ответьте на несколько вопросов, и мы поможем найти идеального дуду", en: "Answer a few questions and we'll help you find the ideal doudou" },
  "gift.start": { ro: "Începe", ru: "Начать", en: "Start" },
  "gift.back": { ro: "Înapoi", ru: "Назад", en: "Back" },
  "gift.next": { ro: "Continuă", ru: "Далее", en: "Continue" },
  "gift.findDoudou": { ro: "Găsește Doudoul Meu", ru: "Найти моего Дуду", en: "Find My Doudou" },
  "gift.step": { ro: "Pasul", ru: "Шаг", en: "Step" },
  "gift.of": { ro: "din", ru: "из", en: "of" },
  "gift.questionAge": { ro: "Pentru ce vârstă?", ru: "Для какого возраста?", en: "For what age?" },
  "gift.questionType": { ro: "Ce tip de jucărie?", ru: "Какой тип игрушки?", en: "What type of toy?" },
  "gift.questionColor": { ro: "Ce culoare preferi?", ru: "Какой цвет предпочитаете?", en: "What color do you prefer?" },
  "gift.questionBudget": { ro: "Care este bugetul?", ru: "Какой у вас бюджет?", en: "What is your budget?" },
  
  // Gift Ideas Page
  "giftIdeas.title": { ro: "Idei Cadouri", ru: "Идеи подарков", en: "Gift Ideas" },
  "giftIdeas.subtitle": { ro: "Găsește cadoul perfect pentru orice ocazie", ru: "Найдите идеальный подарок для любого случая", en: "Find the perfect gift for any occasion" },
  "giftIdeas.allGifts": { ro: "Toate Ideile Cadouri", ru: "Все идеи подарков", en: "All Gift Ideas" },
  "giftIdeas.giftsFor": { ro: "Cadouri pentru", ru: "Подарки для", en: "Gifts for" },
  "giftIdeas.noProducts": { ro: "Nu am găsit produse pentru această selecție.", ru: "Товары для этого выбора не найдены.", en: "No products found for this selection." },
  "giftIdeas.showAll": { ro: "Afișează toate produsele", ru: "Показать все товары", en: "Show all products" },
  "giftIdeas.filterByOccasion": { ro: "După Ocazie", ru: "По случаю", en: "By Occasion" },
  "giftIdeas.filterByAge": { ro: "După Vârstă", ru: "По возрасту", en: "By Age" },
  "giftIdeas.clearFilters": { ro: "Șterge filtrele", ru: "Сбросить фильтры", en: "Clear filters" },
  
  // Occasions
  "occasion.birth": { ro: "Naștere", ru: "Рождение", en: "Birth" },
  "occasion.birthDesc": { ro: "Celebrați sosirea bebelușului", ru: "Отпразднуйте рождение малыша", en: "Celebrate the baby's arrival" },
  "occasion.baptism": { ro: "Botez", ru: "Крестины", en: "Baptism" },
  "occasion.baptismDesc": { ro: "O amintire de neuitat", ru: "Незабываемое воспоминание", en: "An unforgettable memory" },
  "occasion.birthday": { ro: "Zi de Naștere", ru: "День рождения", en: "Birthday" },
  "occasion.birthdayDesc": { ro: "Bucurați cei mici", ru: "Порадуйте малышей", en: "Delight the little ones" },
  "occasion.giftSets": { ro: "Seturi Cadou", ru: "Подарочные наборы", en: "Gift Sets" },
  "occasion.giftSetsDesc": { ro: "Tot într-unul, gata de oferit", ru: "Всё в одном, готово к подарку", en: "All-in-one, ready to gift" },
  
  // Our Story Page - Updated with real company history
  "story.title": { ro: "Povestea Noastră", ru: "Наша история", en: "Our Story" },
  "story.intro": { 
    ro: "Fă din viața ta un vis, și dintr-un vis, o realitate. Pasionat de universul jucăriilor în care a crescut, Alain Joly a decis să revoluționeze acest sector fondând Doudou et Compagnie în 1999.",
    ru: "Сделай свою жизнь мечтой, а мечту реальностью. Увлеченный миром игрушек, в котором вырос, Ален Жоли решил революционизировать эту индустрию, основав Doudou et Compagnie в 1999 году.",
    en: "Make your life a dream, and a dream, a reality. Passionate about the toy universe in which he grew up, Alain Joly decided to revolutionize this sector by founding Doudou et Compagnie in 1999."
  },
  "story.values": { ro: "Valorile Noastre", ru: "Наши ценности", en: "Our Values" },
  "story.history": { ro: "Istoria Noastră", ru: "Наша история", en: "Our History" },
  "story.frenchDesign": { ro: "Design Franțuzesc", ru: "Французский дизайн", en: "French Design" },
  "story.frenchDesignDesc": { ro: "Creat și conceput în atelierele noastre pariziene", ru: "Создано и разработано в наших парижских мастерских", en: "Created and designed in our Parisian workshops" },
  "story.quality": { ro: "Calitate", ru: "Качество", en: "Quality" },
  "story.qualityDesc": { ro: "Materiale premium, durabile și certificate", ru: "Премиум материалы, прочные и сертифицированные", en: "Premium materials, durable and certified" },
  "story.safety": { ro: "Siguranță", ru: "Безопасность", en: "Safety" },
  "story.safetyDesc": { ro: "Teste riguroase, standarde europene EN71", ru: "Тщательное тестирование, европейские стандарты EN71", en: "Rigorous testing, European EN71 standards" },
  "story.ecoFriendly": { ro: "Eco-friendly", ru: "Экологичность", en: "Eco-friendly" },
  "story.ecoFriendlyDesc": { ro: "Angajați pentru planetă și viitorul copiilor", ru: "Забота о планете и будущем детей", en: "Committed to the planet and children's future" },
  
  // Timeline entries based on real company history
  "story.1999": { ro: "Fondarea Doudou et Compagnie", ru: "Основание Doudou et Compagnie", en: "Founding of Doudou et Compagnie" },
  "story.1999Desc": { ro: "Alain Joly fondează compania în Val d'Oise, Franța, alături de echipa sa talentată, inclusiv Zora - stilistul și mama echipei.", ru: "Ален Жоли основывает компанию в Валь-д Уаз, Франция, вместе со своей талантливой командой, включая Зору стилиста и маму команды.", en: "Alain Joly founds the company in Val d'Oise, France, alongside his talented team, including Zora - the stylist and mom of the team." },
  "story.2000": { ro: "Nașterea Primului DOUDOU", ru: "Рождение первого DOUDOU", en: "Birth of the First DOUDOU" },
  "story.2000Desc": { ro: "Zora coase un mic cap de iepure de pluș pe lângoul nou-născutului său. Așa s-a născut primul Doudou fără umplutură - o revoluție în lumea jucăriilor pentru copii.", ru: "Зора пришивает маленькую плюшевую голову зайчика к пеленке своего новорожденного. Так родился первый Дуду без наполнителя революция в мире детских игрушек.", en: "Zora sews a small plush rabbit head onto her newborn's blanket. Thus was born the first unstuffed Doudou - a revolution in the world of children's toys." },
  "story.2003": { ro: "Doudou-Marionetă", ru: "Дуду-Марионетка", en: "Doudou-Puppet" },
  "story.2003Desc": { ro: "Inspirată de succesul Doudou-urilor, marca creează Doudou-Marioneta pentru povești magice între părinți și copii.", ru: "Вдохновленный успехом Дуду, бренд создает Дуду-Марионетку для волшебных историй между родителями и детьми.", en: "Inspired by the success of Doudous, the brand creates the Doudou-Puppet for magical stories between parents and children." },
  "story.2010": { ro: "Lapin Bonbon - Un Cult", ru: "Lapin Bonbon Культовая коллекция", en: "Lapin Bonbon - A Cult Classic" },
  "story.2010Desc": { ro: "Succes imediat pentru aceste irezistibile bile de tandrețe, apreciate pentru extrema lor moliciune.", ru: "Мгновенный успех этих неотразимых шариков нежности, ценимых за их невероятную мягкость.", en: "Immediate success for these irresistible balls of tenderness, appreciated for their extreme softness." },
  "story.2015": { ro: "Parteneriat cu UNICEF", ru: "Партнерство с UNICEF", en: "UNICEF Partnership" },
  "story.2015Desc": { ro: "Doudou et Compagnie se angajează alături de UNICEF, donând 1 euro pentru fiecare Doudou solidar achiziționat.", ru: "Doudou et Compagnie присоединяется к UNICEF, жертвуя 1 евро за каждый проданный солидарный Дуду.", en: "Doudou et Compagnie commits to UNICEF, donating 1 euro for each solidarity Doudou purchased." },
  "story.2018": { ro: "Garanția Doudou", ru: "Гарантия Doudou", en: "Doudou Guarantee" },
  "story.2018Desc": { ro: "Un serviciu excepțional: Doudou pierdut - găsit rapid, Doudou deteriorat - reparat, Doudou de negăsit - refabricat!", ru: "Исключительный сервис: потерянный Дуду быстро найден, поврежденный отремонтирован, недоступный изготовлен заново!", en: "An exceptional service: Lost Doudou - quickly found, damaged Doudou - repaired, unavailable Doudou - remade!" },
  "story.2019": { ro: "Achiziția Maïlou Tradition", ru: "Приобретение Maïlou Tradition", en: "Maïlou Tradition Acquisition" },
  "story.2019Desc": { ro: "Grupul achiziționează unul dintre ultimele ateliere de fabricație de pluș din Franța, în Guerche-de-Bretagne.", ru: "Группа приобретает одну из последних мастерских по производству плюша во Франции, в Герш-де-Бретань.", en: "The group acquires one of the last plush manufacturing workshops in France, in Guerche-de-Bretagne." },
  "story.2024": { ro: "25 de Ani de Tandrețe", ru: "25 лет нежности", en: "25 Years of Tenderness" },
  "story.2024Desc": { ro: "Celebrăm un sfert de secol de inovație și tandrețe, continuând să aducem confort copiilor din întreaga lume.", ru: "Мы празднуем четверть века инноваций и нежности, продолжая дарить комфорт детям по всему миру.", en: "We celebrate a quarter century of innovation and tenderness, continuing to bring comfort to children around the world." },
  
  // Help Page
  "help.title": { ro: "Ajutor", ru: "Помощь", en: "Help" },
  "help.subtitle": { ro: "Suntem aici să vă ajutăm", ru: "Мы здесь, чтобы помочь", en: "We're here to help" },
  "help.faq": { ro: "Întrebări Frecvente", ru: "Часто задаваемые вопросы", en: "Frequently Asked Questions" },
  "help.contact": { ro: "Contactați-ne", ru: "Свяжитесь с нами", en: "Contact Us" },
  "help.sendMessage": { ro: "Trimiteți un mesaj", ru: "Отправить сообщение", en: "Send a message" },
  "help.name": { ro: "Nume", ru: "Имя", en: "Name" },
  "help.namePlaceholder": { ro: "Numele dvs.", ru: "Ваше имя", en: "Your name" },
  "help.email": { ro: "Email", ru: "Эл. почта", en: "Email" },
  "help.subject": { ro: "Subiect", ru: "Тема", en: "Subject" },
  "help.subjectPlaceholder": { ro: "Cum vă putem ajuta?", ru: "Как мы можем помочь?", en: "How can we help?" },
  "help.message": { ro: "Mesaj", ru: "Сообщение", en: "Message" },
  "help.messagePlaceholder": { ro: "Descrieți problema sau întrebarea dvs...", ru: "Опишите вашу проблему или вопрос...", en: "Describe your issue or question..." },
  "help.send": { ro: "Trimite Mesajul", ru: "Отправить сообщение", en: "Send Message" },
  "help.liveChat": { ro: "Chat Live", ru: "Онлайн чат", en: "Live Chat" },
  "help.phone": { ro: "Telefon", ru: "Телефон", en: "Phone" },
  "help.address": { ro: "Adresă", ru: "Адрес", en: "Address" },
  "help.hours": { ro: "Program", ru: "Режим работы", en: "Hours" },
  "help.hoursValue": { ro: "Luni - Vineri: 9:00 - 18:00", ru: "Пн - Пт: 9:00 - 18:00", en: "Mon - Fri: 9:00 AM - 6:00 PM" },
  
  // FAQ
  "faq.tracking": { ro: "Cum pot urmări comanda mea?", ru: "Как отследить мой заказ?", en: "How can I track my order?" },
  "faq.trackingAnswer": { ro: "După expedierea comenzii, veți primi un email cu numărul de urmărire. Puteți verifica starea livrării accesând link-ul din email sau contactându-ne direct.", ru: "После отправки заказа вы получите письмо с номером отслеживания. Вы можете проверить статус доставки по ссылке в письме или связавшись с нами.", en: "After your order ships, you'll receive an email with a tracking number. You can check delivery status via the link in the email or by contacting us." },
  "faq.returns": { ro: "Care este politica de retur?", ru: "Какова политика возврата?", en: "What is the return policy?" },
  "faq.returnsAnswer": { ro: "Acceptăm retururi în termen de 30 de zile de la primirea produsului. Produsele trebuie să fie în starea originală, cu etichetele atașate și în ambalajul original.", ru: "Мы принимаем возвраты в течение 30 дней после получения товара. Товары должны быть в оригинальном состоянии с бирками и в оригинальной упаковке.", en: "We accept returns within 30 days of receiving the product. Items must be in original condition with tags attached and in original packaging." },
  "faq.washing": { ro: "Cum pot spăla doudou-ul?", ru: "Как стирать дуду?", en: "How can I wash the doudou?" },
  "faq.washingAnswer": { ro: "Majoritatea doudou-urilor noastre pot fi spălate la mașină la 30°C, în ciclu delicat. Vă recomandăm să folosiți o pungă de protecție și să evitați uscătorul.", ru: "Большинство наших дуду можно стирать в машине при 30°C на деликатном режиме. Рекомендуем использовать мешок для стирки и избегать сушилки.", en: "Most of our doudous can be machine washed at 30°C on a delicate cycle. We recommend using a laundry bag and avoiding the dryer." },
  "faq.newborn": { ro: "Produsele sunt sigure pentru nou-născuți?", ru: "Безопасны ли товары для новорождённых?", en: "Are products safe for newborns?" },
  "faq.newbornAnswer": { ro: "Da, toate produsele noastre sunt testate și certificate conform normelor europene de siguranță EN71 și sunt potrivite pentru utilizare de la naștere.", ru: "Да, все наши товары протестированы и сертифицированы согласно европейским стандартам безопасности EN71 и подходят для использования с рождения.", en: "Yes, all our products are tested and certified according to European safety standards EN71 and are suitable for use from birth." },
  "faq.giftWrap": { ro: "Oferiți servicii de ambalare cadou?", ru: "Предлагаете ли вы подарочную упаковку?", en: "Do you offer gift wrapping?" },
  "faq.giftWrapAnswer": { ro: "Da! La finalizarea comenzii puteți selecta opțiunea de ambalare cadou. Oferim ambalaj premium cu panglică și un mesaj personalizat.", ru: "Да! При оформлении заказа вы можете выбрать опцию подарочной упаковки. Мы предлагаем премиум упаковку с лентой и персональным посланием.", en: "Yes! At checkout you can select the gift wrapping option. We offer premium packaging with ribbon and a personalized message." },
  "faq.delivery": { ro: "Cât durează livrarea?", ru: "Сколько времени занимает доставка?", en: "How long does delivery take?" },
  "faq.deliveryAnswer": { ro: "Livrarea standard durează 3-5 zile lucrătoare în România. Pentru comenzile plasate înainte de ora 14:00, expedierea se face în aceeași zi.", ru: "Стандартная доставка занимает 3-5 рабочих дней по Румынии. Заказы, оформленные до 14:00, отправляются в тот же день.", en: "Standard delivery takes 3-5 business days in Romania. Orders placed before 2:00 PM ship the same day." },
  
  // Collections Page
  "collections.title": { ro: "Colecții", ru: "Коллекции", en: "Collections" },
  "collections.subtitle": { ro: "Explorați universurile noastre de personaje adorabile", ru: "Исследуйте наши миры очаровательных персонажей", en: "Explore our universes of adorable characters" },
  
  // Footer
  "footer.newsletter": { ro: "Alătură-te Familiei Doudou", ru: "Присоединяйтесь к семье Дуду", en: "Join the Doudou Family" },
  "footer.newsletterDesc": { ro: "Primește noutățile și ofertele noastre exclusive", ru: "Получайте наши новости и эксклюзивные предложения", en: "Receive our news and exclusive offers" },
  "footer.emailPlaceholder": { ro: "Adresa ta de email", ru: "Ваш email", en: "Your email address" },
  "footer.subscribe": { ro: "Abonează-te", ru: "Подписаться", en: "Subscribe" },
  "footer.shop": { ro: "Catalog", ru: "Каталог", en: "Catalog" },
  "footer.about": { ro: "Despre Noi", ru: "О нас", en: "About Us" },
  "footer.help": { ro: "Ajutor", ru: "Помощь", en: "Help" },
  "footer.allRights": { ro: "Toate drepturile rezervate", ru: "Все права защищены", en: "All rights reserved" },
  "footer.description": { ro: "Creatori de momente tandre din 1999. Jucării premium pentru bebeluși, fabricate cu dragoste în Franța.", ru: "Создаём нежные моменты с 1999 года. Премиум игрушки для малышей, сделанные с любовью во Франции.", en: "Creating tender moments since 1999. Premium baby toys, made with love in France." },
  "footer.allProducts": { ro: "Toate Produsele", ru: "Все товары", en: "All Products" },
  "footer.newArrivals": { ro: "Noutăți", ru: "Новинки", en: "New Arrivals" },
  "footer.bestsellers": { ro: "Bestsellers", ru: "Бестселлеры", en: "Bestsellers" },
  "footer.contact": { ro: "Contact", ru: "Контакты", en: "Contact" },
  "footer.delivery": { ro: "Livrare", ru: "Доставка", en: "Delivery" },
  "footer.returnsFooter": { ro: "Returnări", ru: "Возвраты", en: "Returns" },
  "footer.faqFooter": { ro: "FAQ", ru: "FAQ", en: "FAQ" },
  "footer.legal": { ro: "Legal", ru: "Юридическое", en: "Legal" },
  "footer.terms": { ro: "Termeni și Condiții", ru: "Условия использования", en: "Terms & Conditions" },
  "footer.privacy": { ro: "Confidențialitate", ru: "Конфиденциальность", en: "Privacy" },
  "footer.cookies": { ro: "Cookies", ru: "Cookies", en: "Cookies" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return (saved as Language) || "ro";
    }
    return "ro";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
