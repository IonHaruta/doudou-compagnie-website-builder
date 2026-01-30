import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "@/data/products";

const languages = [
  { code: "ro" as const, name: "RO", flag: "🇷🇴" },
  { code: "ru" as const, name: "RU", flag: "🇷🇺" },
  { code: "en" as const, name: "EN", flag: "🇬🇧" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const catalogCategories = [
    { name: t("catalog.all"), href: "/catalog?reset=true" },
    { name: t("catalog.new"), href: "/catalog?filter=new" },
    { name: t("catalog.byAge"), href: "/catalog?filter=age" },
    { name: t("catalog.byGender"), href: "/catalog?filter=gender" },
    { name: t("catalog.sale"), href: "/catalog?filter=sale" },
  ];

  const navLinks = [
    { name: t("nav.collections"), href: "/colectii" },
    { name: t("nav.giftIdeas"), href: "/idei-cadouri" },
    { name: t("nav.ourStory"), href: "/povestea-noastra" },
    { name: t("nav.help"), href: "/ajutor" },
  ];

  const searchResults = searchQuery.length >= 2
    ? products.filter(p => 
        t(p.nameKey).toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleProductClick = (productId: number) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/produs/${productId}`);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-display text-xl lg:text-2xl font-medium text-foreground italic">
                Doudou & Compagnie
              </span>
            </Link>

            {/* Desktop Navigation - visible from md breakpoint */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Catalog Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCatalogOpen(true)}
                onMouseLeave={() => setIsCatalogOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith('/catalog') 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t("nav.catalog")}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isCatalogOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-background rounded-xl shadow-lg border border-border py-2 z-50"
                    >
                      {catalogCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Dark Mode Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex text-muted-foreground hover:text-foreground"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-1 px-2 text-muted-foreground hover:text-foreground">
                    <span className="text-base">{currentLang.flag}</span>
                    <span className="text-sm font-medium">{currentLang.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? 'bg-muted' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
              <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link to="/cos">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t border-border"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {/* Language & Theme Mobile */}
                <div className="flex items-center justify-between py-2 border-b border-border mb-2">
                  <div className="flex items-center gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                          language === lang.code 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Catalog with submenu */}
                <div className="py-2">
                  <button
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    className="flex items-center justify-between w-full text-base font-medium text-foreground"
                  >
                    {t("nav.catalog")}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isCatalogOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-4 space-y-2"
                      >
                        {catalogCategories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-base font-medium text-foreground py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("search.title")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={t(product.nameKey)}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{t(product.nameKey)}</p>
                      <p className="text-sm text-muted-foreground">€{product.price.toFixed(2)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                {t("search.noResults")} "{searchQuery}"
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
