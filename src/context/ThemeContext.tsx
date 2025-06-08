
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'gold' | 'blue-water' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hasMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeState, setThemeState] = useState<Theme | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      let initialTheme: Theme;
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (storedTheme) {
        initialTheme = storedTheme;
      } else if (prefersDark) {
        initialTheme = 'dark';
      } else {
        initialTheme = 'blue-water'; // Default theme
      }
      setThemeState(initialTheme);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (themeState && hasMounted) {
      const root = window.document.documentElement;
      root.classList.remove('dark', 'theme-blue-water'); // Remove all theme classes

      if (themeState === 'dark') {
        root.classList.add('dark');
      } else if (themeState === 'blue-water') {
        root.classList.add('theme-blue-water');
      }
      // 'gold' theme is applied by :root styles when no other theme class is present
      localStorage.setItem('theme', themeState);
    }
  }, [themeState, hasMounted]);

  const handleSetTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Provide a default theme if themeState is null during initialization
  const currentContextTheme = themeState ?? 'blue-water';

  return (
    <ThemeContext.Provider value={{ theme: currentContextTheme, setTheme: handleSetTheme, hasMounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
