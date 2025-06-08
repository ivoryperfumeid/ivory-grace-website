
// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import ThemeSwitcher from '@/components/ThemeSwitcher'; // Ensure this path is correct

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Video Galeri', href: '/video-gallery' },
  { label: 'Collection', href: '/#perfume-catalog' },
  // { label: 'Contact', href: '/#contact' }, 
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false); 
    } else {
      setIsMobileMenuOpen(false); 
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="relative px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {isClient && <ThemeSwitcher />}
          </div>
          <div className="md:hidden">
            {isClient && ( 
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                  <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <Logo />
                      <SheetClose asChild>
                         <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                          </Button>
                      </SheetClose>
                    </div>
                    <nav className="flex flex-col space-y-2">
                      {navItems.map((item) => (
                        <SheetClose key={item.label} asChild>
                          <Link
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="relative text-lg font-medium text-foreground hover:text-accent transition-colors py-2 group block"
                          >
                            {item.label}
                             <span className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-auto pt-6 border-t border-border/30">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
