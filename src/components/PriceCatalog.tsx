
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet } from 'lucide-react';

const priceData = [
  { id: 'price-15ml', size: '15ml', price: 'Rp 20.000' },
  { id: 'price-35ml', size: '35ml', price: 'Rp 35.000' },
  { id: 'price-60ml', size: '60ml', price: 'Rp 60.000' },
  { id: 'price-100ml', size: '100ml', price: 'Rp 100.000' },
];

const PriceCatalog = () => {
  return (
    <section id="price-catalog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          Pilihan Ukuran & Harga Refill
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg rounded-lg border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-center text-card-foreground">
                Ukuran Standar Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {priceData.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-4 border-b border-border/30 last:border-b-0 rounded-md hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Droplet className="w-5 h-5 text-accent" />
                      <span className="text-lg font-medium font-body text-card-foreground">{item.size}</span>
                    </div>
                    <span className="text-lg font-semibold font-body text-accent">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-sm text-foreground/70 mt-8 max-w-xl mx-auto">
          Harga berlaku untuk refill parfum standar. Campuran khusus atau esens premium mungkin memiliki harga berbeda. Silakan hubungi kami untuk detail lebih lanjut.
        </p>
      </div>
    </section>
  );
};

export default PriceCatalog;
