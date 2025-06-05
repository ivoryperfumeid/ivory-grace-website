
import type { Inspiration } from '@/types';

export const inspirations: Inspiration[] = [
  {
    id: 'insp1',
    title: 'Elegansi Malam Hari',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'elegant evening fashion',
    description: 'Tampilan klasik dan memukau untuk acara malam spesial Anda.',
    associatedPerfumeId: '2', // Velvet Oud Extrait de Parfum
    associatedPerfumeName: 'Velvet Oud Extrait de Parfum',
    perfumeLink: '/#perfume-catalog', // Links to the catalog section for now
  },
  {
    id: 'insp2',
    title: 'Segar Sepanjang Hari',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'fresh daytime style',
    description: 'Gaya kasual namun tetap menawan untuk aktivitas sehari-hari.',
    associatedPerfumeId: '6', // Sun-kissed Citrus Eau Fraiche
    associatedPerfumeName: 'Sun-kissed Citrus Eau Fraiche',
    perfumeLink: '/#perfume-catalog',
  },
  {
    id: 'insp3',
    title: 'Pesona Feminin',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'feminine floral outfit',
    description: 'Sentuhan lembut dan romantis yang memancarkan keanggunan.',
    associatedPerfumeId: '1', // Luminous Bloom Eau de Parfum
    associatedPerfumeName: 'Luminous Bloom Eau de Parfum',
    perfumeLink: '/#perfume-catalog',
  },
];
