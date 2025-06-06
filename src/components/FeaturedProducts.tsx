
'use client';

import { perfumes } from '@/data/perfumes';
import { PlayCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Bersihkan timeout jika komponen unmount atau hoveredVideoId berubah
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hoveredVideoId]);

  const handleMouseEnter = (item: typeof featuredItems[0], index: number) => {
    if (item.videoSrc) {
      setHoveredVideoId(item.id);
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        videoElement.currentTime = 0; // Mulai dari awal
        videoElement.play().catch(error => console.error("Error playing video:", error));

        // Hentikan setelah 3 detik
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          videoElement.pause();
          setHoveredVideoId(null); // Opsional: reset state hover jika ingin berhenti total
        }, 3000);
      }
    }
  };

  const handleMouseLeave = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredVideoId(null);
    const videoElement = videoRefs.current[index];
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
    }
  };

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer aspect-[9/16] sm:aspect-video"
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {item.videoSrc ? (
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={item.videoSrc}
                    poster={item.imageSrc}
                    muted
                    loop
                    playsInline // Penting untuk autoplay di beberapa browser mobile
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.imageSrc}
                    alt={`Thumbnail untuk ${item.name}`}
                    data-ai-hint={item.aiHint || "product image"}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                )}
                {/* Overlay hanya muncul jika bukan video yang sedang di-hover ATAU jika item tidak punya videoSrc */}
                {(!item.videoSrc || hoveredVideoId !== item.id) && (
                   <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle size={48} className="text-white/80 mb-2 sm:size={64}" />
                    <h3 className="text-sm sm:text-lg font-semibold text-white text-center px-2 sm:px-4 font-headline">{item.name}</h3>
                  </div>
                )}
                 {/* Overlay nama produk di bawah, selalu terlihat tipis */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-xs sm:text-md font-semibold text-white font-body truncate">{item.name}</h3>
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
