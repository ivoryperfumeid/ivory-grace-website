
import type { Perfume } from '@/types';

// Contoh URL video placeholder. Ganti dengan URL video Anda.
const placeholderVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const vimeoEmbedUrl = "https://player.vimeo.com/video/1091205091?h=e1259b256b";

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Luminous Bloom Eau de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: vimeoEmbedUrl, // Menggunakan URL embed Vimeo
    aiHint: 'perfume bottle floral',
    description: 'A radiant floral fragrance with notes of jasmine, tuberose, and sandalwood. Captures the essence of a garden in full bloom.',
    price: 'Rp 1.250.000',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Velvet Oud Extrait de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: vimeoEmbedUrl, // Menggunakan URL embed Vimeo untuk testing
    aiHint: 'luxury perfume dark',
    description: 'A rich and mysterious blend of precious oud, velvety rose, and warm amber. An unforgettable and opulent experience.',
    price: 'Rp 2.800.000',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Graceful Whisper Eau de Toilette',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: vimeoEmbedUrl, // Menggunakan URL embed Vimeo untuk testing
    aiHint: 'elegant perfume light',
    description: 'A delicate and sophisticated scent featuring notes of white tea, bergamot, and soft musk. Perfect for everyday elegance.',
    price: 'Rp 950.000',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Ivory Elixir Pure Perfume',
    imageSrc: 'https://placehold.co/400x600.png',
    // videoSrc: placeholderVideo, // Contoh tanpa video
    aiHint: 'classic perfume gold',
    description: 'The signature scent of Ivory & Grace. A timeless composition of rare iris, creamy vanilla, and a hint of spice.',
    price: 'Rp 3.500.000',
  },
  {
    id: '5',
    name: 'Midnight Charm Eau de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: placeholderVideo, 
    aiHint: 'perfume bottle night',
    description: 'An alluring and seductive fragrance with notes of black orchid, patchouli, and dark chocolate. For moments of intrigue.',
    price: 'Rp 1.500.000',
  },
  {
    id: '6',
    name: 'Sun-kissed Citrus Eau Fraiche',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: vimeoEmbedUrl, // Menggunakan URL embed Vimeo untuk testing
    aiHint: 'fresh perfume citrus',
    description: 'A vibrant and refreshing spritz of Sicilian lemon, mandarin, and neroli. Captures the joy of a summer morning.',
    price: 'Rp 750.000',
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Enchanted Forest Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    // videoSrc: placeholderVideo,
    aiHint: 'perfume bottle green',
    description: 'A mystical journey through woody notes of cedarwood, vetiver, and a touch of incense. Grounding and serene.',
    price: 'Rp 2.100.000',
  },
  {
    id: '8',
    name: 'Royal Amber Absolute',
    imageSrc: 'https://placehold.co/400x600.png',
    // videoSrc: placeholderVideo,
    aiHint: 'perfume bottle amber',
    description: 'A majestic and warm fragrance centered around rich amber, complemented by vanilla and spices. Regal and comforting.',
    price: 'Rp 2.500.000',
  },
];
