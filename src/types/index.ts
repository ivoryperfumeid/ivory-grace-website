
export interface Perfume {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
  price: string; // Using string for formatted price like "Rp 1.250.000"
  isFeatured?: boolean;
  aiHint?: string;
}

export interface Inspiration {
  id: string;
  title: string;
  imageSrc: string;
  aiHint?: string;
  description?: string;
  associatedPerfumeId: string;
  associatedPerfumeName: string;
  perfumeLink?: string; // URL or anchor to the perfume
}
