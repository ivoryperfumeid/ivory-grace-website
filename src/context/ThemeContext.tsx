
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
      // console.log(`ThemeProvider: Initializing theme. Stored: ${storedTheme}, PrefersDark: ${prefersDark}, Resolved: ${initialTheme}`);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (themeState && hasMounted) {
      const root = window.document.documentElement;
      // console.log(`ThemeProvider: Attempting to apply theme "${themeState}" to DOM. Current <html> classes: ${root.className}`);
      root.classList.remove('dark', 'theme-blue-water');
      // console.log(`ThemeProvider: <html> classes after removal step: ${root.className}`);

      if (themeState === 'dark') {
        root.classList.add('dark');
        // console.log(`ThemeProvider: Added "dark" class to <html>.`);
      } else if (themeState === 'blue-water') {
        root.classList.add('theme-blue-water');
        // console.log(`ThemeProvider: Added "theme-blue-water" class to <html>.`);
      }
      // 'gold' theme is applied by :root styles when no other theme class is present
      localStorage.setItem('theme', themeState);
      // console.log(`ThemeProvider: Final <html> classes: ${root.className}. Theme "${themeState}" saved to localStorage.`);
    } else if (!themeState && hasMounted) {
      // console.log("ThemeProvider: Theme is null, skipping DOM update.");
    }
  }, [themeState, hasMounted]);

  const handleSetTheme = useCallback((newTheme: Theme) => {
    // console.log(`ThemeProvider: User explicitly set theme to "${newTheme}".`);
    setThemeState(newTheme);
  }, []);

  const currentContextTheme = themeState ?? (hasMounted ? 'blue-water' : 'blue-water'); // Default to blue-water if still null post-mount

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
