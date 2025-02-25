import { useState, useCallback, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { TitleSettings } from '../types/title';
import { DEFAULT_TITLE_SETTINGS } from '../constants/titleSettings';
import { validateTitleSettings } from '../utils/titleSettings';

export const useTitleSettings = () => {
  const [settings, setSettings] = useState<TitleSettings>(() => {
    const saved = getLocalStorage('titleSettings');
    return validateTitleSettings(saved);
  });

  // Listen for storage changes to sync settings across components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'titleSettings') {
        const newSettings = e.newValue ? JSON.parse(e.newValue) : null;
        setSettings(validateTitleSettings(newSettings));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSettings = useCallback((newSettings: TitleSettings) => {
    const validated = validateTitleSettings(newSettings);
    setSettings(validated);
    setLocalStorage('titleSettings', validated);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'titleSettings',
      newValue: JSON.stringify(validated)
    }));
  }, []);

  return {
    settings,
    updateSettings
  };
};