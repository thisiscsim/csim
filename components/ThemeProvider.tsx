'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // TEMPORARILY DISABLED: Force dark mode only
  const [theme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Force dark mode on mount
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle is disabled - always dark mode
  const toggleTheme = useCallback(() => {
    // Temporarily disabled
  }, []);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
