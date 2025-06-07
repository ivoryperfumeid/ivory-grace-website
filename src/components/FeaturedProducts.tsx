
'use client';

import { perfumes } from '@/data/perfumes';
import { PlayCircle } from 'lucide-react'; // Menggunakan ikon yang lebih sesuai
import { useRef, useState, useEffect } from 'react';

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured).slice(0, 4);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [videoErrorIds, setVideoErrorIds] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Bersihkan timeout jika komponen unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (item: typeof featuredItems[0], index: number) => {
    if (item.videoSrc && !videoErrorIds.has(item.id)) {
      setHoveredVideoId(item.id);
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        videoElement.currentTime = 0; // Mulai dari awal
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            const typedError = error as Error; // Cast to Error to access 'name'
            if (typedError.name === 'AbortError') {
              // Playback was interrupted by pause(). This is expected with hover effects.
              // console.log('Video playback interrupted as expected for item:', item.id);
            } else {
              // For other errors (e.g., video format not supported, network error),
              // log it as a warning and treat it as a video load failure.
              console.warn(`Warning: Problem playing video "${item.name}" (Reason: ${typedError.name} - ${typedError.message}). Falling back to image.`);
              handleVideoError(item.id, index);
            }
          });
        }

        // Hentikan setelah 3 detik
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          const currentVideoElement = videoRefs.current[index];
          if (currentVideoElement && !currentVideoElement.paused) {
            currentVideoElement.pause();
          }
          // Only reset hoveredVideoId if the video that timed out is still the one considered hovered.
          setHoveredVideoId(prevHoveredId => (prevHoveredId === item.id ? null : prevHoveredId));
        }, 3000);
      }
    }
  };

  const handleMouseLeave = (item: typeof featuredItems[0], index: number) => {
    if (videoErrorIds.has(item.id)) return; 

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredVideoId(prev => (prev === item.id ? null : prev));
    
    const videoElement = videoRefs.current[index];
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
    }
  };

  const handleVideoError = (itemId: string, index: number) => {
    setVideoErrorIds(prev => new Set(prev).add(itemId));
    const videoElement = videoRefs.current[index];
    if (videoElement) {
        videoElement.pause(); // Ensure video is paused
    }
    if (timeoutRef.current && hoveredVideoId === itemId) { // Clear timeout if it was for this video
        clearTimeout(timeoutRef.current);
    }
    setHoveredVideoId(prev => (prev === itemId ? null : prev)); // Reset hover state if this item errored
  };

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredItems.map((item, index) => {
              const hasVideoFailed = videoErrorIds.has(item.id);
              const showVideo = item.videoSrc && !hasVideoFailed;

              return (
                <div
                  key={item.id}
                  className="group relative w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer aspect-[9/16]"
                  onMouseEnter={() => handleMouseEnter(item, index)}
                  onMouseLeave={() => handleMouseLeave(item, index)}
                >
                  {showVideo ? (
                    <video
                      ref={el => videoRefs.current[index] = el}
                      src={item.videoSrc!}
                      poster={item.imageSrc}
                      muted
                      loop
                      playsInline // Penting untuk autoplay di beberapa browser mobile
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      onError={() => handleVideoError(item.id, index)} // Fallback if video source itself is bad
                      id={`video-${item.id}`}
                    />
                  ) : (
                    <img
                      src={item.imageSrc}
                      alt={`Thumbnail untuk ${item.name}`}
                      data-ai-hint={item.aiHint || "product image"}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  )}
                  {/* Overlay logic: Show if video is not playing or if it's an image fallback */}
                  {(!showVideo || (showVideo && hoveredVideoId !== item.id)) && (
                     <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle size={48} className="text-white/80 mb-2 sm:size={64}" />
                      <h3 className="text-sm sm:text-lg font-semibold text-white text-center px-2 sm:px-4 font-headline">{item.name}</h3>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-xs sm:text-md font-semibold text-white font-body truncate">{item.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-foreground/70">Tidak ada video unggulan saat ini.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
