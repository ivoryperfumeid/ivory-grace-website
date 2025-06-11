
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Note } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Link href="/notes-library" passHref legacyBehavior>
      <a className="block h-full group transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full rounded-lg border-border/50 bg-card group-hover:border-accent/70 transition-colors duration-300">
          <CardHeader className="p-0">
            <div className="aspect-square relative w-full overflow-hidden rounded-t-lg">
              <Image
                src={note.imageSrc}
                alt={note.name}
                data-ai-hint={note.aiHint || "perfume note scent"}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="text-xl font-headline font-semibold mb-2 text-card-foreground flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-accent flex-shrink-0" />
              {note.name}
            </CardTitle>
            <CardDescription className="text-sm text-card-foreground/80 font-body line-clamp-4">
              {note.description}
            </CardDescription>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default NoteCard;
