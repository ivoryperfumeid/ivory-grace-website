
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PerfumeCatalog from '@/components/PerfumeCatalog';
import InspirationSection from '@/components/InspirationSection';
import PriceCatalog from '@/components/PriceCatalog';
import Footer from '@/components/Footer';
import { SurveyDialog } from '@/components/SurveyDialog';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export default function HomePage() {
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
      {/* Conditionally render SurveyDialog only if not GitHub Pages and logic allows */}
      {process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true' && shouldActivateSurvey && (
        <SurveyDialog isOpen={isSurveyOpen} onOpenChange={setIsSurveyOpen} />
      )}
      <ScrollToTopButton />
    </div>
  );
}
