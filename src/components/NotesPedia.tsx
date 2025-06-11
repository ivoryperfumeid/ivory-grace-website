
'use client';

import { notes } from '@/data/notes';
import NoteCard from './NoteCard';

const NotesPedia = () => {
  return (
    <section id="notes-pedia" className="py-16 md:py-24 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Notes Pedia
        </h2>
        {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
        ) : (
          <p className="text-center text-foreground/70">Perpustakaan notes aroma kami sedang kosong. Silakan periksa kembali nanti!</p>
        )}
      </div>
    </section>
  );
};

export default NotesPedia;
