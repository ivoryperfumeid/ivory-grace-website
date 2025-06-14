
'use client';

import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToNotesPedia = () => {
    const notesPediaElement = document.getElementById('notes-pedia'); // Target diubah ke notes-pedia
    if (notesPediaElement) {
      notesPediaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initialStyle = { opacity: 0 };

  return (
    <section className="relative bg-gradient-to-br from-primary/30 via-background to-background py-20 md:py-32 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Div yang berisi Image placeholder telah dihapus */}
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
            onClick={scrollToNotesPedia} // Fungsi diubah
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Jelajahi Notes Aroma Kami {/* Teks tombol diubah */}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
