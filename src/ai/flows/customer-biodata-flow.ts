
'use server';
/**
 * @fileOverview AI flow to collect customer biodata (name, email, phone) via chat.
 *
 * - customerBiodataChat - Function to interact with the biodata collection AI.
 * - CustomerBiodataChatInput - Input type for the flow.
 * - CustomerBiodataChatOutput - Output type for the flow.
 */

import { ai } from '@/ai/genkit';
import type { Biodata, ChatMessage } from '@/types'; // Import Biodata from global types
import { z } from 'genkit';

// Define Biodata schema locally for use within this flow, but do not export it.
const BiodataSchema = z.object({
  name: z.string().optional().describe('Customer\'s full name.'),
  email: z.string().email().optional().describe('Customer\'s email address.'),
  phone: z.string().optional().describe('Customer\'s phone number.'),
}).describe('Collected customer biodata.');

const CustomerBiodataChatInputSchema = z.object({
  message: z.string().describe("User's latest message."),
  chatHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).optional().describe("History of the conversation."),
  currentBiodata: BiodataSchema.partial().optional().describe("Biodata gathered so far by the client."),
});
export type CustomerBiodataChatInput = z.infer<typeof CustomerBiodataChatInputSchema>;

const CustomerBiodataChatOutputSchema = z.object({
  aiResponse: z.string().describe("AI's response message."),
  isConversationComplete: z.boolean().optional().default(false).describe("True if AI believes all required data is collected and confirmed."),
  fieldToRequestNext: z.enum(['name', 'email', 'phone', 'confirmation', 'none']).optional().describe("Indicates which field the AI is prompting for, or if it's asking for confirmation, or if the conversation is done.")
});
export type CustomerBiodataChatOutput = z.infer<typeof CustomerBiodataChatOutputSchema>;

export async function customerBiodataChat(input: CustomerBiodataChatInput): Promise<CustomerBiodataChatOutput> {
  return customerBiodataChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerBiodataPrompt',
  input: { schema: CustomerBiodataChatInputSchema },
  output: { schema: CustomerBiodataChatOutputSchema },
  prompt: `You are a friendly AI assistant for Ivory & Grace, a luxury perfume brand.
Your goal is to collect the customer's: 1. Full Name, 2. Email Address, 3. Phone Number.
Ask for one piece of information at a time.
If a piece of information is still missing based on \`currentBiodata\`, ask for that.
If the user provides information, acknowledge it.
The user's latest message is: {{{message}}}

Current biodata provided by the client:
- Name: {{#if currentBiodata.name}}'{{currentBiodata.name}}'{{else}}MISSING{{/if}}
- Email: {{#if currentBiodata.email}}'{{currentBiodata.email}}'{{else}}MISSING{{/if}}
- Phone: {{#if currentBiodata.phone}}'{{currentBiodata.phone}}'{{else}}MISSING{{/if}}

Conversation History (most recent is user's last message, if history exists):
{{#if chatHistory}}
{{#each chatHistory}}
- {{this.role}}: {{this.content}}
{{/each}}
{{/if}}
- user: {{{message}}}

Instructions:
1.  If this is the very first message (user's message is "User opened chat" or similar indication of initiation) AND \`currentBiodata\` is empty AND \`chatHistory\` is empty, introduce yourself and ask for the name. Set \`fieldToRequestNext\` to "name". Example: {"aiResponse": "Selamat datang di Ivory & Grace! Saya adalah AI Assistant yang dikembangkan oleh Robby Viory Fansya selaku CEO Ivory & Grace. Untuk memulai, boleh saya tahu nama lengkap Anda?", "fieldToRequestNext": "name"}
2.  If name is MISSING in \`currentBiodata\`, set \`fieldToRequestNext\` to "name" and craft \`aiResponse\` to ask for the full name.
3.  If name is provided in \`currentBiodata\` but email is MISSING, set \`fieldToRequestNext\` to "email" and craft \`aiResponse\` to ask for the email. Acknowledge the name if just provided. Example: "Terima kasih, {{currentBiodata.name}}! Apa alamat email Anda?"
4.  If name and email are provided in \`currentBiodata\` but phone is MISSING, set \`fieldToRequestNext\` to "phone" and craft \`aiResponse\` to ask for the phone number. Acknowledge email if just provided.
5.  If all (name, email, phone) are provided by the client in \`currentBiodata\`, set \`fieldToRequestNext\` to "confirmation". Craft \`aiResponse\` to summarize the collected data (Name: {{currentBiodata.name}}, Email: {{currentBiodata.email}}, Phone: {{currentBiodata.phone}}) and ask "Apakah informasi ini sudah benar?".
6.  If \`fieldToRequestNext\` was "confirmation" (meaning you previously asked for confirmation) and user's current message confirms (e.g., "yes", "correct", "that's right", "sudah benar"), set \`isConversationComplete\` to true, \`fieldToRequestNext\` to "none", and \`aiResponse\` to a thank you message like "Sempurna! Terima kasih telah memberikan detail Anda. Semoga hari Anda menyenangkan!".
7.  If \`fieldToRequestNext\` was "confirmation" and user's current message indicates a correction (e.g., "no, my email is wrong", "my phone number is incorrect", "salah", "emailnya salah"), try to understand which field to correct. If they say "email is wrong", set \`fieldToRequestNext\` to "email" and \`aiResponse\` to "Baik, apa alamat email Anda yang benar?". Do similarly for name or phone. If they say "no" without specifying, ask "Baik, bagian mana yang salah? Nama, email, atau nomor telepon?".
8.  If the user asks an unrelated question, politely steer them back: "Saya bisa bantu dengan pertanyaan lain setelah kita menyelesaikan ini. Untuk sekarang, bisakah kita melanjutkan dengan..." and then repeat the relevant question for the current field (name, email, phone, or confirmation).
9.  Ensure \`aiResponse\` is conversational and friendly.

Respond ONLY with a JSON object matching the CustomerBiodataChatOutputSchema.
Do not add any text outside the JSON object.
`,
});

const customerBiodataChatFlow = ai.defineFlow(
  {
    name: 'customerBiodataChatFlow',
    inputSchema: CustomerBiodataChatInputSchema,
    outputSchema: CustomerBiodataChatOutputSchema,
  },
  async (input) => {
    // Ensure currentBiodata is at least an empty object if undefined
    const currentBiodata = input.currentBiodata || {};
    const chatHistory = input.chatHistory || [];

    const promptInput = {
      ...input,
      currentBiodata, // Use the ensured object
      chatHistory,    // Use the ensured array
    };

    const { output } = await prompt(promptInput);
    if (!output) {
      // Fallback response if LLM fails to provide structured output
      let fallbackField: 'name' | 'email' | 'phone' | 'confirmation' | 'none' = 'name';
      if (currentBiodata.name && !currentBiodata.email) fallbackField = 'email';
      else if (currentBiodata.name && currentBiodata.email && !currentBiodata.phone) fallbackField = 'phone';
      else if (currentBiodata.name && currentBiodata.email && currentBiodata.phone) fallbackField = 'confirmation';
      
      return {
        aiResponse: "Maaf, saya mengalami sedikit kendala. Bisakah Anda mencoba lagi?",
        isConversationComplete: false,
        fieldToRequestNext: fallbackField,
      };
    }
    return output;
  }
);

