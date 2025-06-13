'use client';

import { MessageCircleHeart, Sparkles, Truck } from 'lucide-react';

const MarqueeBanner = () => {
  const bannerSegments = [
    { text: "Selamat datang di Ivory & Grace!", icon: Sparkles },
    { text: "Temukan diskon spesial untuk pembelian pertama Anda.", icon: null },
    { text: "Butuh bantuan? AI Assistant kami siap membantu Anda!", icon: MessageCircleHeart },
    { text: "Gratis Ongkir untuk wilayah Jabodetabek!", icon: Truck },
  ];

  return (
    <div className="bg-accent text-accent-foreground py-2.5 overflow-hidden shadow-md sticky top-16 z-40 w-full">
      <div className="whitespace-nowrap animate-marquee flex items-center">
        {/* Render segments twice for seamless loop */}
        {[...bannerSegments, ...bannerSegments].map((segment, index) => (
          <span
            key={index}
            className="mx-6 sm:mx-8 text-xs sm:text-sm font-medium flex items-center"
            aria-hidden={index >= bannerSegments.length ? 'true' : undefined} // Hide duplicated content from screen readers
          >
            {segment.icon && <segment.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 inline-block flex-shrink-0" />}
            {segment.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
