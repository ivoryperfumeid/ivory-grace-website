
'use client';
import { inspirations } from '@/data/inspirations';
import InspirationCard from './InspirationCard';

const InspirationSection = () => {
  if (!inspirations || inspirations.length === 0) {
    return null; // Don't render section if no inspirations
  }

  return (
    <section id="inspiration-section" className="py-16 md:py-24 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Temukan Inspirasi Gaya Anda
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {inspirations.map((item) => (
            <InspirationCard key={item.id} inspiration={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
