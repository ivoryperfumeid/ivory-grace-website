
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, ShoppingCart, Search } from 'lucide-react'; // Import Search icon
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'; // Import Dialog components
import { ModulPencarianDialogContent } from '@/components/ModulPencarianDialogContent'; // Import modal content

const priceData = [
  { id: 'price-15ml', size: '15ml', price: 'Rp 20.000' },
  { id: 'price-35ml', size: '35ml', price: 'Rp 35.000' },
  { id: 'price-60ml', size: '60ml', price: 'Rp 60.000' },
  { id: 'price-100ml', size: '100ml', price: 'Rp 100.000' },
];

const PriceCatalog = () => {
  const whatsappLink = "https://wa.me/62895372115913"; // Nomor WhatsApp Anda

  return (
    <section id="price-catalog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8 text-foreground">
          Pilihan Ukuran & Harga Refill
        </h2>

        {/* Tombol Cari Parfum Baru */}
        <div className="text-center mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out rounded-full px-8 py-3 text-lg font-semibold">
                <Search className="mr-2 h-5 w-5" />
                Cari Semua Parfum Kami
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-card text-card-foreground shadow-xl rounded-lg">
              <ModulPencarianDialogContent />
            </DialogContent>
          </Dialog>
        </div>

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
        <div className="text-center mt-10">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Pesan Sekarang
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PriceCatalog;
