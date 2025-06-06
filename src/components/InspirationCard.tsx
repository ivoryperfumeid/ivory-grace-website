
import Image from 'next/image';
import Link from 'next/link';
import type { Inspiration } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface InspirationCardProps {
  inspiration: Inspiration;
}

const InspirationCard = ({ inspiration }: InspirationCardProps) => {
  const handleShopScentClick = () => {
    if (inspiration.perfumeLink && inspiration.perfumeLink.startsWith('/#')) {
      const elementId = inspiration.perfumeLink.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full rounded-lg border-border/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full overflow-hidden">
          <Image
            src={inspiration.imageSrc}
            alt={inspiration.title}
            data-ai-hint={inspiration.aiHint || "fashion style"}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline font-semibold mb-2 text-foreground">{inspiration.title}</CardTitle>
        {inspiration.description && (
          <CardDescription className="text-sm text-foreground/70 font-body mb-3 line-clamp-2">
            {inspiration.description}
          </CardDescription>
        )}
        <p className="text-sm font-semibold font-body text-primary">
          Cocok dengan: {inspiration.associatedPerfumeName}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {inspiration.perfumeLink && inspiration.perfumeLink.startsWith('/#') ? (
          <Button 
            onClick={handleShopScentClick} 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            aria-label={`Lihat ${inspiration.associatedPerfumeName} di katalog`}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Lihat Parfum
          </Button>
        ) : inspiration.perfumeLink ? (
          <Link href={inspiration.perfumeLink} passHref legacyBehavior>
            <Button 
              asChild 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              aria-label={`Lihat ${inspiration.associatedPerfumeName}`}
            >
              <a><ShoppingBag className="mr-2 h-4 w-4" /> Lihat Parfum</a>
            </Button>
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default InspirationCard;
