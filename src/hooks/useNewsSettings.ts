import { useState, useCallback, useEffect } from 'react';
import { NewsSettings } from '../types/news';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { DEFAULT_NEWS_SETTINGS } from '../constants/newsSettings';

export const useNewsSettings = () => {
  const [settings, setSettings] = useState<NewsSettings>(() => {
    const saved = getLocalStorage('newsSettings');
    if (!saved) return DEFAULT_NEWS_SETTINGS;

    return {
      ...DEFAULT_NEWS_SETTINGS,
      ...saved,
      display: {
        ...DEFAULT_NEWS_SETTINGS.display,
        ...saved.display
      },
      notifications: {
        ...DEFAULT_NEWS_SETTINGS.notifications,
        ...saved.notifications
      },
      items: saved.items || DEFAULT_NEWS_SETTINGS.items
    };
  });

  // Listen for storage changes to sync settings across components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'newsSettings') {
        const newSettings = e.newValue ? JSON.parse(e.newValue) : DEFAULT_NEWS_SETTINGS;
        setSettings(prev => ({
          ...prev,
          ...newSettings,
          display: { ...prev.display, ...newSettings.display },
          notifications: { ...prev.notifications, ...newSettings.notifications },
          items: newSettings.items || []
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSettings = useCallback((newSettings: NewsSettings) => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
      display: {
        ...settings.display,
        ...newSettings.display
      },
      notifications: {
        ...settings.notifications,
        ...newSettings.notifications
      },
      items: newSettings.items || settings.items
    };

    setSettings(updatedSettings);
    setLocalStorage('newsSettings', updatedSettings);
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'newsSettings',
      newValue: JSON.stringify(updatedSettings)
    }));
  }, [settings]);

  return {
    settings,
    updateSettings
  };
};