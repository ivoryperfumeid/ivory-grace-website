
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('perfume-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Style object for initial opacity to prevent flash of unstyled content before animation
  const initialStyle = { opacity: 0 };

  return (
    <section className="relative bg-gradient-to-br from-primary/30 via-background to-background py-20 md:py-32 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background representing luxury and elegance"
          data-ai-hint="luxury perfume background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tight text-foreground animate-fade-in-up"
          style={{ ...initialStyle, animationDelay: '0.2s' }}
        >
          Ivory & Grace
        </h1>
        <p
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80 font-body animate-fade-in-up"
          style={{ ...initialStyle, animationDelay: '0.4s' }}
        >
          Experience the art of fine perfumery. Discover exquisite scents meticulously crafted to evoke grace and sophistication.
        </p>
        <div
          className="mt-10 animate-fade-in-up"
          style={{ ...initialStyle, animationDelay: '0.6s' }}
        >
          <Button
            size="lg"
            onClick={scrollToCatalog}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Explore Our Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
