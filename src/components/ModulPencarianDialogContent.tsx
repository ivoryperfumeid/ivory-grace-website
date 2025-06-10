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

export function ModulPencarianDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline">
          Modul Tabel Pencarian Parfum
        </DialogTitle>
        <DialogDescription>
          Ini akan menjadi modal tabel pencarian parfum full responsif dengan fitur auto suggestion yang terintegrasi dengan Firestore Database.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 my-6 border-y border-border/30">
        {/* Placeholder for table and search input */}
        <p className="text-center text-muted-foreground">
          Pengembangan tabel pencarian dan fitur auto-suggestion akan dilakukan di sini.
        </p>
        <p className="text-sm text-center text-muted-foreground mt-2">
          (Langkah 1: Struktur Dasar Modal Selesai)
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
