import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // theme: 'light' | 'dark' | null (null = user not chosen yet)
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('site_theme');
      return saved ? saved : null;
    } catch {
      return null;
    }
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (value) => {
    try {
      if (value === null) {
        localStorage.removeItem('site_theme');
      } else {
        localStorage.setItem('site_theme', value);
      }
    } catch {}
    setThemeState(value);
  };

  const value = {
    theme,
    setTheme,
    hasChosen: theme !== null
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
