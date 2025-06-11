
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { perfumes } from '@/data/perfumes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'; // Import Dialog components
import { Button } from '@/components/ui/button';
import { X, PlayCircle } from 'lucide-react'; // Import X for close, PlayCircle for overlay

interface PerfumeVideo {
  id: string;
  name: string;
  imageSrc: string;
  videoSrc?: string;
  aiHint?: string;
}

const getYouTubeEmbedUrl = (videoId: string, autoplay = false, controls = true) => {
  let url = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams();
  if (autoplay) params.append('autoplay', '1');
  if (controls) params.append('controls', '1');
  params.append('rel', '0');
  params.append('modestbranding', '1');

  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  return url;
};

export default function VideoGalleryPage() {
  const videos: PerfumeVideo[] = perfumes.filter(perfume => perfume.videoSrc);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoName, setCurrentVideoName] = useState<string | null>(null);

  const openVideoModal = (video: PerfumeVideo) => {
    if (video.videoSrc) {
      setCurrentVideoUrl(getYouTubeEmbedUrl(video.videoSrc, true, true));
      setCurrentVideoName(video.name);
      setIsModalOpen(true);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setCurrentVideoUrl(null); // Clear src to stop video playback
      setCurrentVideoName(null);
    }
  };

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
                <Card 
                  key={video.id} 
                  className="group overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full rounded-lg border-border/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  <CardHeader className="p-0">
                    <div 
                      className="aspect-video relative w-full overflow-hidden rounded-t-lg cursor-pointer"
                      onClick={() => openVideoModal(video)}
                    >
                      <Image
                        src={video.imageSrc}
                        alt={`Thumbnail for ${video.name}`}
                        data-ai-hint={video.aiHint || "product video thumbnail"}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <PlayCircle size={64} className="text-white/80" />
                      </div>
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

      {/* Video Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent 
          className="bg-black/80 border-none shadow-2xl p-0 max-w-screen-lg w-11/12 aspect-video overflow-hidden rounded-lg flex items-center justify-center"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {currentVideoUrl && (
            <div className="relative w-full h-full">
              <iframe
                src={currentVideoUrl}
                title={`Video player for ${currentVideoName || 'Video'}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white bg-black/60 hover:bg-black/80 rounded-full z-50 p-2"
                  aria-label="Close video player"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
