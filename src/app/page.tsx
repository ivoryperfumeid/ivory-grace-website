
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
// import PerfumeCatalog from '@/components/PerfumeCatalog'; // Diganti dengan NotesPedia
import NotesPedia from '@/components/NotesPedia'; // Impor NotesPedia
import InspirationSection from '@/components/InspirationSection';
import PriceCatalog from '@/components/PriceCatalog';
import Footer from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

interface SurveyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SurveyDialogComponent = process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true'
  ? dynamic<SurveyDialogProps>(() => import('@/components/SurveyDialog').then(mod => mod.SurveyDialog), { 
      ssr: false,
    })
  : () => null;

const HomePage: NextPage = () => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [shouldActivateSurvey, setShouldActivateSurvey] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true') {
      const surveyDismissed = localStorage.getItem('surveyDialogDismissed');
      const surveyCompleted = localStorage.getItem('surveyDialogCompleted');

      if (!surveyDismissed && !surveyCompleted) {
        const timer = setTimeout(() => {
          setShouldActivateSurvey(true);
          setIsSurveyOpen(true);
        }, 3000);
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
        <NotesPedia /> {/* Menggantikan PerfumeCatalog */}
        <InspirationSection />
        <PriceCatalog />
      </main>
      <Footer />
      {shouldActivateSurvey && <SurveyDialogComponent isOpen={isSurveyOpen} onOpenChange={setIsSurveyOpen} />}
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
