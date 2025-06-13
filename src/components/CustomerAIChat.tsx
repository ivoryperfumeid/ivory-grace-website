
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, X, Send, User, MessageSquare, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Biodata, ChatMessage as AppChatMessage } from '@/types';
import { customerBiodataChat, type CustomerBiodataChatInput, type CustomerBiodataChatOutput } from '@/ai/flows/customer-biodata-flow';

// Determine if the component should be active (not on GitHub Pages)
const isGenkitActive = process.env.NEXT_PUBLIC_IS_GITHUB_PAGES !== 'true';

interface UIMessage extends AppChatMessage {
  id: string;
}

export default function CustomerAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBiodata, setCurrentBiodata] = useState<Partial<Biodata>>({});
  const [fieldToRequest, setFieldToRequest] = useState<'name' | 'email' | 'phone' | 'confirmation' | 'none' | undefined>(undefined);
  const [conversationComplete, setConversationComplete] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom and focus input
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
    if (isOpen && inputRef.current && !isLoading && !conversationComplete) {
      inputRef.current.focus();
    }
  }, [messages, isOpen, isLoading, conversationComplete]);

  const callAIFlow = async (userMessageText: string, history: AppChatMessage[], biodata: Partial<Biodata>) => {
    setIsLoading(true);
    try {
      const inputForFlow: CustomerBiodataChatInput = {
        message: userMessageText,
        chatHistory: history,
        currentBiodata: biodata,
      };
      const response: CustomerBiodataChatOutput = await customerBiodataChat(inputForFlow);

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: response.aiResponse }]);
      setFieldToRequest(response.fieldToRequestNext);

      if (response.isConversationComplete) {
        setConversationComplete(true);
      }
    } catch (error) {
      console.error("Error calling AI flow:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: "Sorry, an error occurred. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial greeting from AI when chat opens or is reset
  const startConversation = () => {
    if (isGenkitActive && !conversationComplete) {
      setMessages([]); // Clear previous messages
      setCurrentBiodata({}); // Reset biodata
      setFieldToRequest(undefined); // Reset field to request
      // Trigger initial flow call
      callAIFlow("User opened chat", [], {});
    }
  };
  
  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading) { // Only if chat is opened and empty
        startConversation();
    }
  }, [isOpen]);


  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isGenkitActive || conversationComplete) return;

    const userMessageText = inputValue.trim();
    const newUserMessage: UIMessage = { id: (Date.now() + 1).toString(), role: 'user', content: userMessageText };
    
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInputValue('');

    // Client-side Biodata Update Logic (Simplified attempt)
    let updatedBiodata = { ...currentBiodata };
    if (fieldToRequest === 'name' && userMessageText.length > 1) {
        updatedBiodata.name = userMessageText;
    } else if (fieldToRequest === 'email' && userMessageText.includes('@') && userMessageText.includes('.')) {
        updatedBiodata.email = userMessageText;
    } else if (fieldToRequest === 'phone' && userMessageText.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) { // Basic phone regex
        updatedBiodata.phone = userMessageText;
    }
    setCurrentBiodata(updatedBiodata); // Update state for next AI call

    const historyForAI: AppChatMessage[] = newMessages
        .filter(m => m.id !== newUserMessage.id) // Exclude the very last user message as it's passed separately
        .map(msg => ({ role: msg.role, content: msg.content }));

    await callAIFlow(userMessageText, historyForAI, updatedBiodata);
  };
  
  const resetChat = () => {
    setInputValue('');
    setConversationComplete(false);
    setIsLoading(false);
    startConversation(); // This will clear messages and biodata too
    if (inputRef.current) {
        inputRef.current.focus();
    }
  };

  if (!isGenkitActive) {
    return null; 
  }

  return (
    <>
      <Button
        variant={isOpen ? "destructive" : "default"}
        size="icon"
        className="fixed bottom-6 left-6 z-[60] rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transform hover:scale-110 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm sm:w-96 h-[70vh] max-h-[550px] shadow-xl rounded-lg flex flex-col bg-card border-border/50 transition-all duration-300 ease-in-out transform scale-100 opacity-100">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b border-border/30 sticky top-0 bg-card z-10">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-headline text-card-foreground">Ivory & Grace Assistant</CardTitle>
            </div>
             <Button variant="ghost" size="icon" onClick={resetChat} className="text-card-foreground/70 hover:text-card-foreground" aria-label="Reset Chat">
                <RotateCcw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" viewportRef={scrollAreaRef}>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'model' && <Bot className="h-5 w-5 text-muted-foreground flex-shrink-0 mb-1" />}
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-muted-foreground rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                     {msg.role === 'user' && <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mb-1" />}
                  </div>
                ))}
                {isLoading && messages.length > 0 && ( // Show "typing..." only if there are prior messages
                  <div className="flex items-end gap-2 justify-start">
                     <Bot className="h-5 w-5 text-muted-foreground flex-shrink-0 mb-1" />
                    <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground shadow-sm rounded-bl-none">
                      <span className="italic">typing...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-3 border-t border-border/30 bg-card sticky bottom-0">
            {conversationComplete ? (
                 <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Chat Selesai.</p>
                    {/* Reset button is now in the header */}
                </div>
            ) : (
                <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}
                className="flex items-center gap-2"
                >
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={"Type your message..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow text-sm h-9"
                    disabled={isLoading}
                    autoFocus
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 h-9 w-9" disabled={isLoading || !inputValue.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
                </form>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
