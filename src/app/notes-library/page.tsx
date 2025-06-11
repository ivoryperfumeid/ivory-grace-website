
// src/app/notes-library/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Search } from 'lucide-react';

export default function NotesLibraryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Library className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold font-headline text-foreground">
              Perpustakaan Ensiklopedis Notes Aroma Global
            </h1>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Jelajahi koleksi komprehensif notes aroma dari seluruh dunia. Temukan keluarga olfaktori, profil aroma individual, asal-usulnya, dan penggunaan umumnya dalam seni parfum.
            </p>
          </div>

          <Card className="shadow-lg rounded-lg border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-card-foreground flex items-center">
                <Search className="mr-3 h-6 w-6 text-primary" />
                Pencarian & Penjelajahan Notes (Segera Hadir)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-card-foreground/70">
                <p className="text-xl mb-2">Fitur perpustakaan notes aroma detail sedang dalam pengembangan.</p>
                <p>Kami sedang bekerja keras untuk menghadirkan direktori notes terlengkap untuk Anda. Nantikan pembaruan!</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
