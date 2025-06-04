import { perfumes } from '@/data/perfumes';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featured = perfumes.filter(p => p.isFeatured).slice(0, 4); // Show up to 4 featured products

  return (
    <section id="featured-products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Signature Scents
        </h2>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featured.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">No featured products at the moment. Explore our full collection below!</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
