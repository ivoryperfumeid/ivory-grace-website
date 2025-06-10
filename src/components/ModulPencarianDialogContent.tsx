// src/components/ModulPencarianDialogContent.tsx
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
import { perfumes as allPerfumes } from '@/data/perfumes'; // Import data parfum
import type { Perfume } from '@/types'; // Import tipe Perfume
import { useState } from 'react';

export function ModulPencarianDialogContent() {
  const [searchTerm, setSearchTerm] = useState('');

  // Untuk saat ini, kita hanya menampilkan semua parfum.
  // Logika filter akan ditambahkan di langkah berikutnya.
  const displayedPerfumes = allPerfumes;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline">
          Modul Tabel Pencarian Parfum
        </DialogTitle>
        <DialogDescription>
          Cari parfum favorit Anda dari koleksi Ivory & Grace. Ketikkan nama atau kata kunci pada kolom di bawah.
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
        {displayedPerfumes.length > 0 ? (
          <div className="max-h-[50vh] overflow-y-auto pr-2 rounded-md border border-border/30">
            <Table>
              <TableCaption className="py-4">Daftar parfum Ivory & Grace. Harga dan ketersediaan dapat berubah.</TableCaption>
              <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                <TableRow>
                  <TableHead className="w-[200px] font-semibold">Nama Parfum</TableHead>
                  <TableHead className="font-semibold">Deskripsi Singkat</TableHead>
                  <TableHead className="text-right w-[120px] font-semibold">Harga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedPerfumes.map((perfume) => (
                  <TableRow key={perfume.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium py-3">{perfume.name}</TableCell>
                    <TableCell className="text-sm text-foreground/80 py-3">{perfume.description}</TableCell>
                    <TableCell className="text-right font-semibold text-accent py-3">{perfume.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Tidak ada parfum yang cocok dengan pencarian Anda atau koleksi masih kosong.
          </p>
        )}
        <p className="text-sm text-center text-muted-foreground mt-2">
          (Langkah 2: Tabel Dasar dengan Data Dummy Selesai)
        </p>
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
