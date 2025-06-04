import { Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        <p className="text-sm text-foreground/70 mb-6 max-w-md mx-auto">
          Crafting moments of elegance, one scent at a time. Discover the essence of luxury with Ivory & Grace.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" aria-label="Facebook" className="text-foreground/60 hover:text-accent transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="text-foreground/60 hover:text-accent transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="text-foreground/60 hover:text-accent transition-colors">
            <Twitter size={24} />
          </a>
        </div>
        <p className="text-xs text-foreground/50">
          &copy; {new Date().getFullYear()} Ivory & Grace Perfumes. All rights reserved.
        </p>
        <p className="text-xs text-foreground/50 mt-1">
          Designed with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
