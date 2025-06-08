
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { perfumes } from '@/data/perfumes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import Image from 'next/image'; // Import Image component
import { useState } from 'react'; // Import useState

interface PerfumeVideo {
  id: string;
  name: string;
  imageSrc: string;
  videoSrc?: string;
  aiHint?: string;
}

// Helper function to transform Vimeo URL for gallery display
const getGalleryVimeoUrl = (originalSrc: string): string => {
  if (!originalSrc.includes('vimeo.com')) {
    return originalSrc;
  }
  // Basic transformation: ensure controls are enabled, disable autoplay for gallery view initially.
  // Remove background, loop, muted, title, byline, portrait for a standard player.
  let url = originalSrc;
  url = url.replace(/&autoplay=1/g, '&autoplay=0');
  url = url.replace(/&controls=0/g, '&controls=1');
  url = url.replace(/&muted=1/g, '&muted=0'); // Typically, videos in a gallery page shouldn't autoplay sound
  url = url.replace(/&background=1/g, '');
  url = url.replace(/&loop=1/g, '&loop=0');
  url = url.replace(/&title=0/g, '&title=1');
  url = url.replace(/&byline=0/g, '&byline=1');
  url = url.replace(/&portrait=0/g, '&portrait=1');
  url = url.replace(/&transparent=0/g, ''); // Ensure player is not transparent

  // Add controls=1 if not present
  if (!url.includes('controls=')) {
    url += '&controls=1';
  }
  // Add title=1, byline=1, portrait=1 if not present for better Vimeo player experience
  if (!url.includes('title=')) {
    url += '&title=1';
  }
  if (!url.includes('byline=')) {
    url += '&byline=1';
  }
  if (!url.includes('portrait=')) {
    url += '&portrait=1';
  }
  return url;
};


export default function VideoGalleryPage() {
  const videos: PerfumeVideo[] = perfumes.filter(perfume => perfume.videoSrc);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-center mb-16 text-foreground">
            Galeri Video Lengkap Kami
          </h1>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Card key={video.id} className="group overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full rounded-lg border-border/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative w-full overflow-hidden rounded-t-lg">
                      {playingVideoId === video.id && video.videoSrc ? (
                        <iframe
                          src={getGalleryVimeoUrl(video.videoSrc).replace('&autoplay=0', '&autoplay=1')} // Add autoplay when playing
                          title={`Video player for ${video.name}`}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                      ) : (
                        <>
                          <Image
                            src={video.imageSrc}
                            alt={`Thumbnail for ${video.name}`}
                            data-ai-hint={video.aiHint || "product video thumbnail"}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
                            onClick={() => video.videoSrc && setPlayingVideoId(video.id)}
                          />
                          <div 
                            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={() => video.videoSrc && setPlayingVideoId(video.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle opacity-80"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16 10,8"/></svg>
                          </div>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-headline font-semibold text-foreground">{video.name}</CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-foreground/70">
              Tidak ada video yang tersedia saat ini. Silakan periksa kembali nanti.
            </p>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
