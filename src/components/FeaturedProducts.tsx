
import { perfumes } from '@/data/perfumes';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredVideos = perfumes.filter(p => p.isFeatured).slice(0, 4); // Ambil 4 item untuk galeri video

  return (
    <section id="featured-videos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Video Galeri Eksklusif
        </h2>
        {featuredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group relative aspect-video w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <Image
                  src={video.imageSrc} // Menggunakan imageSrc sebagai thumbnail video
                  alt={`Thumbnail untuk ${video.name}`}
                  data-ai-hint={video.aiHint || "video scene"}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle size={64} className="text-white/80 mb-2" />
                  <h3 className="text-lg font-semibold text-white text-center px-4 font-headline">{video.name}</h3>
                </div>
                {/* Placeholder untuk judul di bawah video jika diinginkan, di luar overlay */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-md font-semibold text-white font-body">{video.name}</h3>
                </div> */}
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
