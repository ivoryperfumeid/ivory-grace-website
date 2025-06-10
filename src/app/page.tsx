
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
import { SurveyDialog } from '@/components/SurveyDialog'; 

export default function HomePage() {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const isStaticExport = process.env.NEXT_PUBLIC_IS_GITHUB_PAGES === 'true';

  useEffect(() => {
    if (isStaticExport) {
      // Don't show survey dialog for GitHub Pages static export
      return;
    }
    
    // Original logic for non-static builds
    // const dismissed = localStorage.getItem('surveyDialogDismissed');
    // const completed = localStorage.getItem('surveyDialogCompleted');
    // if (!dismissed && !completed) {
    //   const timer = setTimeout(() => {
    //     setIsSurveyOpen(true);
    //   }, 1500); 
    //   return () => clearTimeout(timer);
    // }

    // Temporary logic to always show the dialog after a delay (for non-static builds):
     const timer = setTimeout(() => {
        setIsSurveyOpen(true);
      }, 1500); // 1.5 second delay
      return () => clearTimeout(timer);

  }, [isStaticExport]);

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
      {!isStaticExport && <SurveyDialog isOpen={isSurveyOpen} onOpenChange={setIsSurveyOpen} />}
    </div>
  );
}
