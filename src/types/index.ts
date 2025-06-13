
export interface Perfume {
  id: string;
  name: string;
  imageSrc: string;
  videoSrc?: string; // SEKARANG: ID Video YouTube ATAU undefined
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
  perfumeLink?: string; // URL or anchor
}

export interface Note {
  id: string;
  name: string;
  imageSrc: string; // For 400x400 images
  description: string;
  aiHint?: string;
}

export interface Biodata {
  name?: string;
  email?: string;
  phone?: string;
}

// Represents a single message in the chat history
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
