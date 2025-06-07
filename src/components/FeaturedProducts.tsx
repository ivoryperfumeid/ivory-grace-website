
'use client';

import { perfumes } from '@/data/perfumes';
import Image from 'next/image'; // Still needed for items that might not have videoSrc
import { CirclePlay } from 'lucide-react'; // For fallback icon
import { useState, useEffect, useRef } from 'react';

const FeaturedProducts = () => {
  // Filter for items that are featured. We'll handle items with/without videoSrc in the map.
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);

  // State to manage the src for each iframe, allowing for dynamic changes for autoplay
  const [currentIframeSrcs, setCurrentIframeSrcs] = useState<Record<string, string | undefined>>({});
  const [currentlyHoveredItemId, setCurrentlyHoveredItemId] = useState<string | null>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize iframeSrcs with the videoSrc from perfumes data.
    // These URLs in perfumes.ts should now already include title=0&byline=0&portrait=0 for Vimeo.
    const initialSrcs: Record<string, string | undefined> = {};
    featuredItems.forEach(item => {
      initialSrcs[item.id] = item.videoSrc;
    });
    setCurrentIframeSrcs(initialSrcs);
  }, []); // Assuming featuredItems is static. If it could change, add it as a dependency.

  // Helper to get the original "resting" URL for an item (from perfumes.ts)
  const getRestingSrc = (itemId: string): string | undefined => {
    return perfumes.find(p => p.id === itemId)?.videoSrc;
  };

  const handleMouseEnter = (itemId: string) => {
    setCurrentlyHoveredItemId(itemId);
    const restingSrc = getRestingSrc(itemId);

    if (restingSrc && restingSrc.includes('vimeo.com')) {
      // Append autoplay, muted, and background parameters for Vimeo.
      let autoplayUrl = restingSrc;
      const autoplayParams = 'autoplay=1&muted=1&background=1';
      
      // Only add autoplay params if they aren't already in the URL
      // (e.g. from a very quick mouse leave then mouse enter)
      if (!autoplayUrl.includes('autoplay=1')) { 
        if (autoplayUrl.includes('?')) {
          autoplayUrl += `&${autoplayParams}`;
        } else {
          // Should not happen if it's a Vimeo embed URL, as it usually has '?h='
          autoplayUrl += `?${autoplayParams}`;
        }
      }
      setCurrentIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: autoplayUrl }));

      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }

      previewTimeoutRef.current = setTimeout(() => {
        // Only reset if this item is still the one being hovered.
        if (currentlyHoveredItemId === itemId) {
          setCurrentIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: restingSrc }));
        }
      }, 5000); // 5-second preview
    }
  };

  const handleMouseLeave = (itemId: string) => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    const restingSrc = getRestingSrc(itemId);
    // Reset to original "resting" src when mouse leaves, only if it's a Vimeo URL
    // For non-Vimeo, autoplay isn't explicitly handled this way.
    if (restingSrc && restingSrc.includes('vimeo.com')) {
      setCurrentIframeSrcs(prevSrcs => ({ ...prevSrcs, [itemId]: restingSrc }));
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
                onMouseEnter={() => item.videoSrc && item.videoSrc.includes('vimeo.com') && handleMouseEnter(item.id)}
                onMouseLeave={() => item.videoSrc && item.videoSrc.includes('vimeo.com') && handleMouseLeave(item.id)}
              >
                {currentIframeSrcs[item.id] && currentIframeSrcs[item.id]?.includes('vimeo.com') ? (
                  <div className="relative aspect-[9/16] w-full"> {/* Portrait aspect ratio for iframe */}
                    <iframe
                      key={currentIframeSrcs[item.id]} // Adding key helps React re-render iframe on src change
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg border-2 border-transparent group-hover:border-primary/50 transition-colors"
                      src={currentIframeSrcs[item.id]}
                      title={`Video player for ${item.name}`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : (
                  // Fallback to image if no videoSrc or if src is not a Vimeo URL (or not ready in state)
                  <div className="aspect-[9/16] relative w-full">
                    <Image
                      src={item.imageSrc}
                      alt={`Thumbnail untuk ${item.name}`}
                      data-ai-hint={item.aiHint || "product image"}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                      priority={index < 2} // Prioritize loading for first few images
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
