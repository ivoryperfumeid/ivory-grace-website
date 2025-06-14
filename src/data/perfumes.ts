
import type { Perfume } from '@/types';

// Contoh ID Video YouTube untuk placeholder
const youtubeVideoId1 = "Di7XNO8cB2s"; // Nature scene
const youtubeVideoId2 = "VuMZgIhiGjg"; // Short cinematic
const youtubeVideoId3 = "_zK35iw__qY"; // Abstract animation
const youtubeVideoId4 = "x-QJCml3tos"; // Another nature
const youtubeVideoId5 = "5IKe1Y4fzN8"; // Product style video

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Luminous Bloom Eau de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId1, // ID Video YouTube
    aiHint: 'perfume bottle floral',
    description: 'A radiant floral fragrance with notes of jasmine, tuberose, and sandalwood. Captures the essence of a garden in full bloom.',
    price: 'Rp 1.250.000',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Velvet Oud Extrait de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId2, // ID Video YouTube
    aiHint: 'luxury perfume dark',
    description: 'A rich and mysterious blend of precious oud, velvety rose, and warm amber. An unforgettable and opulent experience.',
    price: 'Rp 2.800.000',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Graceful Whisper Eau de Toilette',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId3, // ID Video YouTube
    aiHint: 'elegant perfume light',
    description: 'A delicate and sophisticated scent featuring notes of white tea, bergamot, and soft musk. Perfect for everyday elegance.',
    price: 'Rp 950.000',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Ivory Elixir Pure Perfume',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId1, // Ditambahkan videoSrc
    aiHint: 'classic perfume gold',
    description: 'The signature scent of Ivory & Grace. A timeless composition of rare iris, creamy vanilla, and a hint of spice.',
    price: 'Rp 3.500.000',
    isFeatured: true, // Dijadikan featured
  },
  {
    id: '5',
    name: 'Midnight Charm Eau de Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId5, // ID Video YouTube
    aiHint: 'perfume bottle night',
    description: 'An alluring and seductive fragrance with notes of black orchid, patchouli, and dark chocolate. For moments of intrigue.',
    price: 'Rp 1.500.000',
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Sun-kissed Citrus Eau Fraiche',
    imageSrc: 'https://placehold.co/400x600.png',
    videoSrc: youtubeVideoId4, // ID Video YouTube
    aiHint: 'fresh perfume citrus',
    description: 'A vibrant and refreshing spritz of Sicilian lemon, mandarin, and neroli. Captures the joy of a summer morning.',
    price: 'Rp 750.000',
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Enchanted Forest Parfum',
    imageSrc: 'https://placehold.co/400x600.png',
    // videoSrc: undefined,
    aiHint: 'perfume bottle green',
    description: 'A mystical journey through woody notes of cedarwood, vetiver, and a touch of incense. Grounding and serene.',
    price: 'Rp 2.100.000',
  },
  {
    id: '8',
    name: 'Royal Amber Absolute',
    imageSrc: 'https://placehold.co/400x600.png',
    // videoSrc: undefined,
    aiHint: 'perfume bottle amber',
    description: 'A majestic and warm fragrance centered around rich amber, complemented by vanilla and spices. Regal and comforting.',
    price: 'Rp 2.500.000',
  },
];
