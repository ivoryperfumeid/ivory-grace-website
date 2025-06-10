// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react'; // Changed Database to Search
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose, // Ensure DialogClose is imported
} from '@/components/ui/dialog';
import { ModulPencarianDialogContent } from './ModulPencarianDialogContent';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Video Galeri', href: '/video-gallery' },
  { label: 'Collection', href: '/#perfume-catalog' },
  // { label: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isModulModalOpen, setIsModulModalOpen] = useState(false); // Renamed from isSearchModalOpen to isModulModalOpen for clarity if needed, or keep as is if Modul IS the search

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
    <>
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
            {/* Desktop "Cari Parfum" (formerly Modul) Trigger */}
            <Dialog open={isModulModalOpen} onOpenChange={setIsModulModalOpen}>
              <DialogTrigger asChild>
                <button
                  className="relative px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors group flex items-center"
                  aria-label="Buka pencarian parfum"
                >
                  <Search className="mr-2 h-4 w-4" /> Cari Parfum
                  <span className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-card text-card-foreground shadow-xl rounded-lg">
                <ModulPencarianDialogContent />
              </DialogContent>
            </Dialog>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              {isClient && <ThemeSwitcher />}
            </div>
            <div className="md:hidden">
              {isClient && (
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Buka menu">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                    <div className="flex flex-col space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <Logo />
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Tutup menu">
                            <X className="h-6 w-6" />
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
                        {/* Mobile "Cari Parfum" (formerly Modul) Trigger */}
                        <SheetClose asChild>
                          <button
                            onClick={() => {
                              setIsModulModalOpen(true);
                              setIsMobileMenuOpen(false);
                            }}
                            className="relative text-lg font-medium text-foreground hover:text-accent transition-colors py-2 group block w-full text-left flex items-center"
                            aria-label="Buka pencarian parfum"
                          >
                            <Search className="mr-2 h-5 w-5" /> Cari Parfum
                            <span className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                          </button>
                        </SheetClose>
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
    </>
  );
};

export default Navbar;
