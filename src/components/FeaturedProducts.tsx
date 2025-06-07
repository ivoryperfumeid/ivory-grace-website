
'use client';

import { perfumes } from '@/data/perfumes';
import Image from 'next/image'; // Import next/image for fallback

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card"
              >
                {item.videoSrc ? (
                  <div className="relative aspect-video w-full"> {/* aspect-video for 16:9 ratio */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                      src={item.videoSrc}
                      title={`Video player for ${item.name}`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video relative w-full"> {/* Fallback to image with same aspect ratio */}
                    <Image
                      src={item.imageSrc}
                      alt={`Thumbnail untuk ${item.name}`}
                      data-ai-hint={item.aiHint || "product image"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-md font-semibold text-foreground font-body truncate">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">Tidak ada video unggulan saat ini.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
