
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PerfumeCatalog from '@/components/PerfumeCatalog';
import InspirationSection from '@/components/InspirationSection';
import PriceCatalog from '@/components/PriceCatalog';
import Footer from '@/components/Footer';
// import { SurveyDialog } from '@/components/SurveyDialog'; // Remove static import
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

// Dynamically import SurveyDialog only if not on GitHub Pages
// Need to explicitly type the dynamic component if its props are needed or it's not default export.
// Assuming SurveyDialogProps are { isOpen: boolean; onOpenChange: (open: boolean) => void; }
interface SurveyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SurveyDialogComponent = process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true'
  ? dynamic<SurveyDialogProps>(() => import('@/components/SurveyDialog').then(mod => mod.SurveyDialog), { 
      ssr: false,
      // You can add a loading component if needed:
      // loading: () => <p>Loading survey...</p> 
    })
  : () => null; // Render null if on GitHub Pages

const HomePage: NextPage = () => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  // State to control whether the survey *logic* (like setting timeout) should run and if dialog should be shown
  const [shouldActivateSurvey, setShouldActivateSurvey] = useState(false);

  useEffect(() => {
    // Only run survey activation logic if NOT on GitHub Pages
    if (process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true') {
      const surveyDismissed = localStorage.getItem('surveyDialogDismissed');
      const surveyCompleted = localStorage.getItem('surveyDialogCompleted');

      if (!surveyDismissed && !surveyCompleted) {
        const timer = setTimeout(() => {
          setShouldActivateSurvey(true); // Indicate that survey can be shown
          setIsSurveyOpen(true);         // Attempt to open it
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <PerfumeCatalog />
        <InspirationSection />
        <PriceCatalog />
      </main>
      <Footer />
      {/* Conditionally render SurveyDialogComponent only if logic allows */}
      {/* The component itself will be null if on GitHub Pages due to dynamic import logic */}
      {shouldActivateSurvey && <SurveyDialogComponent isOpen={isSurveyOpen} onOpenChange={setIsSurveyOpen} />}
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
