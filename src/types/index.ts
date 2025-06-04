export interface Perfume {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
  price: string; // Using string for formatted price like "Rp 1.250.000"
  isFeatured?: boolean;
  aiHint?: string;
}
