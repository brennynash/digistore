import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => 
    getLocalStorage('selectedTheme') || 'default'
  );

  const updateTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    setLocalStorage('selectedTheme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  return {
    currentTheme,
    updateTheme,
    toggleTheme
  };
};