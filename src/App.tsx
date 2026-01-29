import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CollectionsPage from "./pages/CollectionsPage";
import GiftIdeasPage from "./pages/GiftIdeasPage";
import OurStoryPage from "./pages/OurStoryPage";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalog" element={<ShopPage />} />
                <Route path="/magazin" element={<ShopPage />} /> {/* Legacy redirect */}
                <Route path="/produs/:id" element={<ProductPage />} />
                <Route path="/cos" element={<CartPage />} />
                <Route path="/colectii" element={<CollectionsPage />} />
                <Route path="/idei-cadouri" element={<GiftIdeasPage />} />
                <Route path="/povestea-noastra" element={<OurStoryPage />} />
                <Route path="/ajutor" element={<HelpPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
