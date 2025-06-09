
'use client';

import { Perfume } from '@/types';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, X } from 'lucide-react';
import { perfumes } from '@/data/perfumes';
import Image from 'next/image';
import Link from 'next/link';
// Import the Genkit flow
import { suggestPerfume, SuggestPerfumeInput, SuggestPerfumeOutput } from '@/ai/flows/suggest-perfume-flow';

interface SurveyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const surveySteps = [
  {
    id: 1,
    question: "Suasana apa yang ingin Anda ciptakan dengan parfum Anda?",
    options: ["Segar & Bersemangat", "Elegan & Mewah", "Misterius & Memikat", "Tenang & Nyaman"],
    answerKey: 'occasion' as keyof SuggestPerfumeInput,
  },
  {
    id: 2,
    question: "Kapan biasanya Anda akan memakai parfum ini?",
    options: ["Aktivitas sehari-hari", "Acara spesial malam hari", "Kerja atau acara formal", "Santai di akhir pekan"],
    answerKey: 'usageTime' as keyof SuggestPerfumeInput,
  },
  {
    id: 3,
    question: "Aroma dominan apa yang paling Anda sukai?",
    options: ["Bunga (Floral)", "Kayu (Woody)", "Buah (Citrus/Fruity)", "Manis (Sweet/Gourmand)", "Rempah (Spicy)"],
    answerKey: 'dominantScent' as keyof SuggestPerfumeInput,
  },
];

export function SurveyDialog({ isOpen, onOpenChange }: SurveyDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<SuggestPerfumeInput>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestPerfumeOutput | null>(null);
  const [suggestedPerfumeDetails, setSuggestedPerfumeDetails] = useState<Perfume | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (answerKey: keyof SuggestPerfumeInput, value: string) => {
    setAnswers((prev) => ({ ...prev, [answerKey]: value }));
  };

  const resetSurvey = () => {
    setCurrentStep(1);
    setAnswers({});
    setIsLoading(false);
    setResult(null);
    setSuggestedPerfumeDetails(null);
    setError(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Optionally, reset survey only when explicitly closed before completion,
    // or when reopened after completion. For now, we reset on any close.
    localStorage.setItem('surveyDialogDismissed', 'true');
    setTimeout(resetSurvey, 300); // Delay reset to allow dialog to close smoothly
  };
  
  const handleNext = () => {
    if (currentStep < surveySteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitSurvey();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitSurvey = async () => {
    if (Object.keys(answers).length !== surveySteps.length) {
      setError("Harap jawab semua pertanyaan.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);
    setSuggestedPerfumeDetails(null);

    try {
      const flowInput = answers as SuggestPerfumeInput;
      const flowResult = await suggestPerfume(flowInput);
      setResult(flowResult);
      const foundPerfume = perfumes.find(p => p.id === flowResult.perfumeId);
      if (foundPerfume) {
        setSuggestedPerfumeDetails(foundPerfume);
      } else {
        setError(`Parfum yang direkomendasikan (ID: ${flowResult.perfumeId}) tidak ditemukan dalam data kami.`);
      }
      setCurrentStep(surveySteps.length + 1); // Move to result step
      localStorage.setItem('surveyDialogCompleted', 'true'); // Mark as completed
    } catch (e) {
      console.error("Error suggesting perfume:", e);
      setError("Maaf, terjadi kesalahan saat membuat rekomendasi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentSurveyStep = surveySteps[currentStep - 1];
  const canProceed = currentSurveyStep ? !!answers[currentSurveyStep.answerKey] : false;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); else onOpenChange(true); }}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground shadow-xl rounded-lg">
        <DialogHeader className="pr-10"> {/* Add padding for the close button */}
          <DialogTitle className="text-2xl font-headline">
            {currentStep <= surveySteps.length ? `Langkah ${currentStep}: Temukan Parfum Sempurnamu!` : "Rekomendasi Untuk Anda"}
          </DialogTitle>
        </DialogHeader>
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
        </Button>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-foreground/80">Mencari parfum terbaik untuk Anda...</p>
          </div>
        )}

        {!isLoading && currentStep <= surveySteps.length && currentSurveyStep && (
          <div className="py-4 space-y-6">
            <p className="text-md text-foreground/90">{currentSurveyStep.question}</p>
            <RadioGroup
              value={answers[currentSurveyStep.answerKey] || ''}
              onValueChange={(value) => handleAnswerChange(currentSurveyStep.answerKey, value)}
              className="space-y-3"
            >
              {currentSurveyStep.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`${currentSurveyStep.id}-${option}`} />
                  <Label htmlFor={`${currentSurveyStep.id}-${option}`} className="font-normal text-foreground/80 cursor-pointer flex-1">{option}</Label>
                </div>
              ))}
            </RadioGroup>
             {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        )}

        {!isLoading && currentStep > surveySteps.length && result && suggestedPerfumeDetails && (
          <div className="py-4 space-y-4">
            <p className="text-md text-foreground/90">{result.recommendationText}</p>
            <div className="border border-border rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 bg-muted/30">
              <div className="relative w-24 h-36 sm:w-28 sm:h-40 flex-shrink-0 rounded overflow-hidden shadow-md">
                <Image
                  src={suggestedPerfumeDetails.imageSrc}
                  alt={suggestedPerfumeDetails.name}
                  data-ai-hint={suggestedPerfumeDetails.aiHint || "perfume bottle"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold font-headline text-primary">{suggestedPerfumeDetails.name}</h3>
                <p className="text-sm text-foreground/70 line-clamp-2">{suggestedPerfumeDetails.description}</p>
                <p className="text-md font-semibold text-accent mt-1">{suggestedPerfumeDetails.price}</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleClose}>
              <Link href={`/#perfume-catalog`}>Lihat Detail Parfum</Link>
            </Button>
          </div>
        )}
         {!isLoading && currentStep > surveySteps.length && error && (
           <p className="text-sm text-destructive py-4">{error}</p>
        )}


        {!isLoading && (
          <DialogFooter className="gap-2 sm:justify-between mt-6">
             {currentStep <= surveySteps.length && (
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Kembali
              </Button>
             )}
             {currentStep > surveySteps.length && ( // Show a different button on result screen
                <Button variant="outline" onClick={() => { resetSurvey(); onOpenChange(true); /* Reopen to start survey */ }}>
                  Ulangi Survei
                </Button>
             )}
            {currentStep <= surveySteps.length ? (
              <Button onClick={handleNext} disabled={!canProceed}>
                {currentStep === surveySteps.length ? 'Dapatkan Rekomendasi' : 'Lanjut'}
              </Button>
            ) : (
               <Button onClick={handleClose}>Selesai</Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

    