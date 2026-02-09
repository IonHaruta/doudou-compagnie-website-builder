import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import GiftFinder from "@/components/GiftFinder";
import FeaturedProducts from "@/components/FeaturedProducts";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <GiftFinder />
      <FeaturedProducts />
      <Collections />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
