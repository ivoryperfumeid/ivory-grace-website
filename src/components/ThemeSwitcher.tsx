
// src/components/ThemeSwitcher.tsx
'use client';

import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Theme } from '@/context/ThemeContext'; // Import Theme type

const ThemeSwitcher = () => {
  const { theme, setTheme, hasMounted } = useTheme();
  
  // Provide a default theme for icon display if theme is briefly null during initialization or not mounted
  const currentDisplayTheme: Theme = hasMounted && theme ? theme : 'blue-water';

  if (!hasMounted) {
    // Render a placeholder or null until the theme is determined client-side
    return <Button variant="ghost" size="icon" aria-label="Ganti tema" disabled><Palette className="h-5 w-5" /></Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Ganti tema">
          {currentDisplayTheme === 'gold' && <Sun className="h-5 w-5" />}
          {currentDisplayTheme === 'blue-water' && <Palette className="h-5 w-5 text-blue-500" />}
          {currentDisplayTheme === 'dark' && <Moon className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('gold')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Emas (Terang)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('blue-water')}>
          <Palette className="mr-2 h-4 w-4 text-blue-500" />
          <span>Biru Air (Terang)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Gelap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
