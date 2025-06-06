
import Image from 'next/image';
import type { Perfume } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react'; // Placeholder for a perfume icon

interface ProductCardProps {
  perfume: Perfume;
}

const ProductCard = ({ perfume }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full rounded-lg border-border/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative w-full overflow-hidden">
          <Image
            src={perfume.imageSrc}
            alt={perfume.name}
            data-ai-hint={perfume.aiHint || "perfume bottle"}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline font-semibold mb-2 text-foreground">{perfume.name}</CardTitle>
        <CardDescription className="text-sm text-foreground/70 font-body line-clamp-3">
          {perfume.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold font-body text-accent">{perfume.price}</p>
        <Sparkles className="w-5 h-5 text-accent/70" />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
