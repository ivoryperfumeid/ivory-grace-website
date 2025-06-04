import { perfumes } from '@/data/perfumes';
import ProductCard from './ProductCard';

const PerfumeCatalog = () => {
  return (
    <section id="perfume-catalog" className="py-16 md:py-24 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Our Full Collection
        </h2>
        {perfumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        ) : (
          <p className="text-center text-foreground/70">Our perfume collection is currently empty. Please check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default PerfumeCatalog;
