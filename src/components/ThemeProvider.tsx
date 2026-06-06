'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  accent: string;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: string) => void;
  accentOptions: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ACCENT_OPTIONS = ['#FF3D88', '#F2A900', '#3B5BFF', '#9EE493', '#06D6F2', '#EDEAE2'];

const isBrightAccent = (hex: string) => {
  if (!hex) return true;
  const c = hex.replace('#', '');
  if (c.length < 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.58; // bright accent → needs dark ink
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [accent, setAccentState] = useState<string>('#FF3D88');

  // Load theme and accent on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('uxe-theme') as Theme;
    const savedAccent = localStorage.getItem('uxe-accent');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme);
    }
    if (savedAccent && ACCENT_OPTIONS.includes(savedAccent)) {
      setAccentState(savedAccent);
    }
  }, []);

  // Update theme class and variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', accent);
    
    const ink = isBrightAccent(accent) ? '#0B0B0A' : '#EDEAE2';
    root.style.setProperty('--accent-ink', ink);

    localStorage.setItem('uxe-accent', accent);
  }, [accent]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
    localStorage.setItem('uxe-theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setAccent = (a: string) => setAccentState(a);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, accentOptions: ACCENT_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
