
"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  useEffect(() => {
    // This effect runs only on the client, after initial render
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      // Don't run this effect if not on the client yet (e.g., during SSR or initial hydration)
      return;
    }

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Check visibility on mount (client-side)

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isClient]); // Re-run this effect when isClient becomes true

  const handleClick = () => {
    if (isClient) { // Ensure window is available
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const buttonClassName = cn(
    "fixed bottom-4 right-4 z-50 rounded-full p-2 shadow-lg hover:shadow-xl bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-110 transition-all duration-300 ease-in-out",
    isClient && isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
  );

  return (
    <Button
      variant="outline"
      size="icon"
      className={buttonClassName}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}
