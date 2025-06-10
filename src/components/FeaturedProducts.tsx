
'use client';

import { perfumes } from '@/data/perfumes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlay, Film } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const FeaturedProducts = () => {
  const featuredItems = perfumes.filter(p => p.isFeatured && p.videoSrc).slice(0, 4);
  const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState<string | null>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getYouTubeEmbedUrl = (videoId: string, autoplay = false, loop = false, controls = false, mute = false) => {
    let url = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    if (mute) params.append('mute', '1'); // mute harus 1 agar autoplay bekerja di banyak browser
    if (loop) {
      params.append('loop', '1');
      params.append('playlist', videoId); // loop memerlukan playlist dengan videoId yang sama
    }
    if (!controls) params.append('controls', '0');
    params.append('modestbranding', '1'); // Mengurangi logo YouTube
    // params.append('showinfo', '0'); // Deprecated tapi kadang masih berguna
    params.append('rel', '0'); // Tidak menampilkan video terkait dari channel lain

    const paramString = params.toString();
    if (paramString) {
      url += `?${paramString}`;
    }
    return url;
  };

  const handleMouseEnter = (itemId: string, videoId: string | undefined) => {
    if (!videoId) return;

    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    setCurrentPlayingVideoId(itemId); // Set video yang sedang diputar untuk di-iframe

    // Otomatis kembali ke thumbnail setelah 5 detik
    previewTimeoutRef.current = setTimeout(() => {
      setCurrentPlayingVideoId(null);
    }, 7000); // Durasi pratinjau video
  };

  const handleMouseLeave = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }
    // Tidak langsung menghentikan video di sini, biarkan timeout yang menghandel
    // atau jika ingin stop langsung: setCurrentPlayingVideoId(null);
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
                onMouseEnter={() => handleMouseEnter(item.id, item.videoSrc)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative aspect-[9/16] w-full">
                  {currentPlayingVideoId === item.id && item.videoSrc ? (
                    <iframe
                      key={item.id + '-player'} // Key unik untuk re-render iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-lg border-2 border-transparent group-hover:border-primary/50 transition-colors"
                      src={getYouTubeEmbedUrl(item.videoSrc, true, true, false, true)} // autoplay, loop, no controls, mute
                      title={`Pratinjau video untuk ${item.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <>
                      <Image
                        src={item.imageSrc} // Idealnya, ini adalah thumbnail dari video YouTube atau gambar terkait
                        alt={`Thumbnail untuk ${item.name}`}
                        data-ai-hint={item.aiHint || "product video thumbnail"}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg cursor-pointer">
                        <CirclePlay size={48} className="text-white/80 mb-2" />
                        <h3 className="text-sm sm:text-md font-semibold text-white text-center p-2">{item.name}</h3>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-3 sm:p-4 mt-auto bg-card rounded-b-lg">
                  <h3 className="text-sm sm:text-md font-semibold text-foreground font-body truncate">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">Tidak ada video unggulan saat ini.</p>
        )}
        {featuredItems.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/video-gallery" passHref legacyBehavior>
              <Button
                variant="outline"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <Film className="mr-2 h-5 w-5" />
                Lihat Semua Video
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
