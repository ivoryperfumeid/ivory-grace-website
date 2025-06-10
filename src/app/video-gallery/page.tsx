
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { perfumes } from '@/data/perfumes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import Image from 'next/image';
import { useState } from 'react';

interface PerfumeVideo {
  id: string;
  name: string;
  imageSrc: string; // URL untuk thumbnail
  videoSrc?: string; // SEKARANG: ID Video YouTube
  aiHint?: string;
}

const getYouTubeEmbedUrl = (videoId: string, autoplay = false, controls = true) => {
  let url = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams();
  if (autoplay) params.append('autoplay', '1');
  if (controls) params.append('controls', '1');
  // Anda bisa menambahkan parameter lain jika perlu, misal: rel=0, modestbranding=1
  params.append('rel', '0'); 
  params.append('modestbranding', '1');

  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  return url;
};


export default function VideoGalleryPage() {
  // Filter parfum yang memiliki videoSrc (ID video YouTube)
  const videos: PerfumeVideo[] = perfumes.filter(perfume => perfume.videoSrc);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null); // Menyimpan ID parfum yang videonya sedang diputar

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
                          src={getYouTubeEmbedUrl(video.videoSrc, true, true)} // Autoplay, controls
                          title={`Video player for ${video.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                      ) : (
                        <>
                          {/* Idealnya, imageSrc adalah thumbnail dari video YouTube atau gambar yang relevan */}
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
