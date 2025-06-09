
'use server';
/**
 * @fileOverview A perfume suggestion AI agent based on user survey responses.
 *
 * - suggestPerfume - A function that handles the perfume suggestion process.
 * - SuggestPerfumeInput - The input type for the suggestPerfume function.
 * - SuggestPerfumeOutput - The return type for the suggestPerfume function.
 */

import { ai } from '@/ai/genkit';
import { perfumes as allPerfumes } from '@/data/perfumes'; // Import perfume data
import type { Perfume } from '@/types';
import { z } from 'genkit';

const SuggestPerfumeInputSchema = z.object({
  occasion: z.string().describe("Suasana atau acara yang diinginkan pengguna, contoh: 'Segar & Bersemangat', 'Elegan & Mewah'"),
  usageTime: z.string().describe("Kapan parfum akan dipakai, contoh: 'Aktivitas sehari-hari', 'Acara spesial malam hari'"),
  dominantScent: z.string().describe("Preferensi aroma dominan, contoh: 'Bunga (Floral)', 'Kayu (Woody)'"),
});
export type SuggestPerfumeInput = z.infer<typeof SuggestPerfumeInputSchema>;

const SuggestPerfumeOutputSchema = z.object({
  perfumeId: z.string().describe("ID parfum yang direkomendasikan dari daftar yang ada."),
  recommendationText: z.string().describe("Teks rekomendasi yang menjelaskan mengapa parfum ini cocok untuk pengguna, sebutkan nama parfumnya dengan jelas."),
});
export type SuggestPerfumeOutput = z.infer<typeof SuggestPerfumeOutputSchema>;

// Prepare perfume data for the prompt - only include essential info
const availablePerfumesForPrompt = allPerfumes.map(p => ({
  id: p.id,
  name: p.name,
  description: p.description,
  // We don't need imageSrc or price for the LLM to make a suggestion based on scent profile
}));

const perfumeSuggestionPrompt = ai.definePrompt({
  name: 'perfumeSuggestionPrompt',
  input: { schema: SuggestPerfumeInputSchema },
  output: { schema: SuggestPerfumeOutputSchema },
  prompt: `Anda adalah seorang ahli parfum yang sangat berpengalaman di Ivory & Grace.
Tugas Anda adalah merekomendasikan SATU parfum dari daftar yang tersedia yang paling sesuai dengan preferensi pengguna.

Preferensi Pengguna:
- Suasana yang diinginkan: {{{occasion}}}
- Waktu pemakaian utama: {{{usageTime}}}
- Preferensi aroma dominan: {{{dominantScent}}}

Daftar Parfum Ivory & Grace yang Tersedia (gunakan ID untuk referensi):
{{#each perfumesData}}
- ID: {{this.id}}, Nama: {{this.name}}, Deskripsi: {{this.description}}
{{/each}}

Analisa preferensi pengguna dengan cermat dan cocokkan dengan deskripsi parfum yang ada.
Pilih SATU ID parfum dari daftar di atas.
Kemudian, buat teks rekomendasi yang personal dan meyakinkan. Jelaskan mengapa parfum tersebut adalah pilihan yang tepat berdasarkan preferensi pengguna. Sebutkan nama parfum yang Anda rekomendasikan dalam teks tersebut.

Pastikan output Anda HANYA dalam format JSON yang sesuai dengan skema output yang telah ditentukan.
PENTING: 'perfumeId' yang Anda hasilkan HARUS merupakan salah satu ID dari "Daftar Parfum Ivory & Grace yang Tersedia".
`,
});


const suggestPerfumeFlow = ai.defineFlow(
  {
    name: 'suggestPerfumeFlow',
    inputSchema: SuggestPerfumeInputSchema,
    outputSchema: SuggestPerfumeOutputSchema,
  },
  async (input) => {
    // Pass the user input AND the list of available perfumes to the prompt
    const { output } = await perfumeSuggestionPrompt({
      ...input,
      perfumesData: availablePerfumesForPrompt // Pass the perfume list here
    });

    if (!output) {
      throw new Error('Gagal mendapatkan output dari model AI.');
    }
    
    // Validate if the returned perfumeId actually exists in our list
    const isValidId = availablePerfumesForPrompt.some(p => p.id === output.perfumeId);
    if (!isValidId) {
        // Fallback or error handling if LLM hallucinates an ID
        console.warn(`LLM returned non-existent perfumeId: ${output.perfumeId}. Falling back or re-prompting might be needed.`);
        // For now, let's throw an error, or you could pick a default.
        // Or, even better, ask the LLM to pick *only* from the list. (Updated prompt for this)
        throw new Error(`Model AI merekomendasikan ID parfum yang tidak valid: ${output.perfumeId}.`);
    }

    return output;
  }
);

// Exported wrapper function
export async function suggestPerfume(input: SuggestPerfumeInput): Promise<SuggestPerfumeOutput> {
  return suggestPerfumeFlow(input);
}

    
