
'use client';

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import type { Perfume } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, type DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fungsi untuk mengambil data parfum dari Firestore
const fetchPerfumes = async (): Promise<Perfume[]> => {
  const perfumesCollection = collection(db, 'perfumes');
  const perfumesQuery = query(perfumesCollection);
  const querySnapshot = await getDocs(perfumesQuery);
  const perfumesList: Perfume[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      name: data.name || 'Nama tidak tersedia',
      description: data.description || 'Deskripsi tidak tersedia',
      price: data.price || '', // Harga akan tetap kosong jika tidak ada di Firestore
      imageSrc: data.imageSrc || 'https://placehold.co/400x600.png',
      videoSrc: data.videoSrc,
      isFeatured: data.isFeatured || false,
      aiHint: data.aiHint,
    };
  });
  return perfumesList;
};

export function ModulPencarianDialogContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: perfumes, isLoading, error } = useQuery<Perfume[], Error>({
    queryKey: ['perfumes'],
    queryFn: fetchPerfumes,
  });

  // For debugging on GitHub Pages
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) { // A more robust check for GH Pages
      console.log('[ModulPencarianDialogContent] Environment: GitHub Pages');
      console.log('[ModulPencarianDialogContent] isLoading:', isLoading);
      console.log('[ModulPencarianDialogContent] error:', error);
      console.log('[ModulPencarianDialogContent] perfumes data:', perfumes);
      if (db) {
        console.log('[ModulPencarianDialogContent] Firebase db object exists. Project ID from db config:', db.app.options.projectId);
      } else {
        console.log('[ModulPencarianDialogContent] Firebase db object does NOT exist.');
      }
    }
  }, [isLoading, error, perfumes]);


  const filteredPerfumes = useMemo(() => {
    if (!perfumes) return [];
    if (!searchTerm) return perfumes;

    return perfumes.filter(
      (perfume) =>
        perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [perfumes, searchTerm]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline">
          Modul Tabel Pencarian Parfum
        </DialogTitle>
        <DialogDescription>
          Cari parfum favorit Anda dari koleksi Ivory & Grace. Ketikkan nama atau kata kunci pada kolom di bawah. Data diambil dari Firestore.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 my-6 border-y border-border/30 space-y-4">
        <Input
          type="text"
          placeholder="Ketik untuk mencari parfum..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-base"
        />
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <p className="text-muted-foreground">Memuat data parfum...</p>
          </div>
        )}
        {error && (
          <p className="text-center text-destructive py-8">
            Gagal memuat data: {error.message}
          </p>
        )}
        {!isLoading && !error && filteredPerfumes.length > 0 && (
          <div className="max-h-[50vh] overflow-y-auto pr-2 rounded-md border border-border/30">
            <Table>
              <TableCaption className="py-4">Daftar parfum Ivory & Grace. Ketersediaan dapat berubah.</TableCaption>
              <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                <TableRow>
                  <TableHead className="w-[250px] font-semibold">Nama Parfum</TableHead>
                  <TableHead className="font-semibold">Deskripsi Singkat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerfumes.map((perfume) => (
                  <TableRow key={perfume.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium py-3">{perfume.name}</TableCell>
                    <TableCell className="text-sm text-foreground/80 py-3">{perfume.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {!isLoading && !error && filteredPerfumes.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            {searchTerm ? "Tidak ada parfum yang cocok dengan pencarian Anda." : "Tidak ada data parfum yang tersedia saat ini."}
          </p>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Tutup
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
