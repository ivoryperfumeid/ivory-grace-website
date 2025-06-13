
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryProvider } from '@/context/QueryProvider'; // Import the new QueryProvider
import MarqueeBanner from '@/components/MarqueeBanner'; // Import the new MarqueeBanner component

export const metadata: Metadata = {
  title: 'Ivory & Grace Perfumes | Scented Elegance',
  description: 'Discover the exquisite collection of Ivory & Grace luxury perfumes. Indulge in modern, elegant scents meticulously crafted for sophistication.',
  keywords: 'perfume, luxury perfume, Ivory & Grace, elegant scents, fragrance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ADDED FOR DIAGNOSIS: Explicit title to check if layout.tsx is rendered */}
        <title>Make your Own Style!</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <QueryProvider> {/* Use the new QueryProvider */}
          <ThemeProvider>
            {/* Navbar is rendered per page, MarqueeBanner will be sticky below it */}
            <MarqueeBanner />
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
