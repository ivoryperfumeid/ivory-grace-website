
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import InspirationSection from '@/components/InspirationSection';
import PerfumeCatalog from '@/components/PerfumeCatalog';
import PriceCatalog from '@/components/PriceCatalog';
import Footer from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { SurveyDialog } from '@/components/SurveyDialog'; // Import SurveyDialog

export default function HomePage() {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  useEffect(() => {
    // Show survey dialog only if it hasn't been dismissed or completed in this session/browser
    const dismissed = localStorage.getItem('surveyDialogDismissed');
    const completed = localStorage.getItem('surveyDialogCompleted');
    if (!dismissed && !completed) {
      // Optional: Add a small delay to let the page load a bit
      const timer = setTimeout(() => {
        setIsSurveyOpen(true);
      }, 1500); // 1.5 second delay
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <InspirationSection /> 
        <PriceCatalog />
        <PerfumeCatalog />
      </main>
      <Footer />
      <ScrollToTopButton />
      <SurveyDialog isOpen={isSurveyOpen} onOpenChange={setIsSurveyOpen} />
    </div>
  );
}

    