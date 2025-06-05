
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import InspirationSection from '@/components/InspirationSection';
import PerfumeCatalog from '@/components/PerfumeCatalog';
import PriceCatalog from '@/components/PriceCatalog';
import Footer from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <InspirationSection /> 
        <PriceCatalog />
        <PerfumeCatalog />
        {/* Placeholder for a potential contact section */}
        {/* <section id="contact" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
              Get In Touch
            </h2>
            <p className="text-center text-lg text-foreground/70 max-w-xl mx-auto">
              Have questions or want to learn more about our exclusive collections? We'd love to hear from you.
            </p>
          </div>
        </section> */}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
