
'use client';

import { perfumes } from '@/data/perfumes';
import Image from 'next/image';
import { CirclePlay } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card flex flex-col"
              >
                {/* Diagnostic messages */}
                {item.videoSrc ? (
                  <div style={{ padding: '3px 0', backgroundColor: 'rgba(0, 255, 0, 0.15)', textAlign: 'center', fontSize: '10px', color: 'green', lineHeight: '1.2' }}>
                    IFRAME PATH for {item.name}.<br />videoSrc: {item.videoSrc ? `"${item.videoSrc}"` : String(item.videoSrc)}
                  </div>
                ) : (
                  <div style={{ padding: '3px 0', backgroundColor: 'rgba(255, 0, 0, 0.15)', textAlign: 'center', fontSize: '10px', color: 'red', lineHeight: '1.2' }}>
                    FALLBACK IMAGE PATH for {item.name}.<br />videoSrc: {item.videoSrc ? `"${item.videoSrc}"` : String(item.videoSrc)}
                  </div>
                )}

                {item.videoSrc ? (
                  <div className="relative aspect-[9/16] w-full"> {/* Portrait aspect ratio for iframe */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg border-2 border-transparent group-hover:border-primary/50 transition-colors" // Subtle border on hover
                      src={item.videoSrc}
                      title={`Video player for ${item.name}`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : (
                  // Fallback to image if no videoSrc
                  <div className="aspect-[9/16] relative w-full">
                    <Image
                      src={item.imageSrc}
                      alt={`Thumbnail untuk ${item.name}`}
                      data-ai-hint={item.aiHint || "product image"}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                      priority={featuredItems.indexOf(item) < 2} // Prioritize loading for first two items
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                      <CirclePlay size={48} className="text-white/80 mb-2" />
                      <h3 className="text-sm sm:text-md font-semibold text-white text-center p-2">{item.name}</h3>
                    </div>
                  </div>
                )}
                <div className="p-3 sm:p-4 mt-auto bg-card rounded-b-lg">
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
    