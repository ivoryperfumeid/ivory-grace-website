
'use client';

import { perfumes } from '@/data/perfumes';
import Image from 'next/image';
import { CirclePlay } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);

  // State to manage the src for each iframe, allowing for dynamic changes
  const [iframeSrcs, setIframeSrcs] = useState<Record<string, string | undefined>>({});
  const [currentlyHoveredItemId, setCurrentlyHoveredItemId] = useState<string | null>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize iframeSrcs with the original videoSrc from perfumes data
    const initialSrcs: Record<string, string | undefined> = {};
    featuredItems.forEach(item => {
      initialSrcs[item.id] = item.videoSrc;
    });
    setIframeSrcs(initialSrcs);
  }, []); // Runs once on mount

  const getOriginalSrc = (itemId: string): string | undefined => {
    return perfumes.find(p => p.id === itemId)?.videoSrc;
  };

  const handleMouseEnter = (itemId: string) => {
    setCurrentlyHoveredItemId(itemId);
    const originalSrc = getOriginalSrc(itemId);

    if (originalSrc) {
      // Append autoplay, muted, and background parameters. Muted & background are often necessary for autoplay to work.
      // Background parameter also hides controls and makes it loop, good for previews.
      const autoplayUrl = `${originalSrc}${originalSrc.includes('?') ? '&' : '?'}autoplay=1&muted=1&background=1`;
      setIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: autoplayUrl }));

      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }

      previewTimeoutRef.current = setTimeout(() => {
        // Only reset if this item is still the one being hovered.
        // This prevents a timeout from an old hover event from affecting a new one.
        if (currentlyHoveredItemId === itemId) {
          setIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: originalSrc }));
        }
      }, 5000); // 5-second preview
    }
  };

  const handleMouseLeave = (itemId: string) => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    const originalSrc = getOriginalSrc(itemId);
    if (originalSrc) {
      // Reset to original src when mouse leaves
      setIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: originalSrc }));
    }

    if (currentlyHoveredItemId === itemId) {
      setCurrentlyHoveredItemId(null);
    }
  };

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className="group w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card flex flex-col"
                onMouseEnter={() => item.videoSrc && handleMouseEnter(item.id)}
                onMouseLeave={() => item.videoSrc && handleMouseLeave(item.id)}
              >
                {iframeSrcs[item.id] ? (
                  <div className="relative aspect-[9/16] w-full"> {/* Portrait aspect ratio for iframe */}
                    <iframe
                      key={iframeSrcs[item.id]} // Adding key helps React re-render iframe on src change
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg border-2 border-transparent group-hover:border-primary/50 transition-colors"
                      src={iframeSrcs[item.id]}
                      title={`Video player for ${item.name}`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : (
                  // Fallback to image if no videoSrc or if src is not ready in state
                  <div className="aspect-[9/16] relative w-full">
                    <Image
                      src={item.imageSrc}
                      alt={`Thumbnail untuk ${item.name}`}
                      data-ai-hint={item.aiHint || "product image"}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                      priority={index < 2}
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
