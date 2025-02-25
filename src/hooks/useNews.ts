import { useState, useCallback, useEffect } from 'react';
import { NewsSettings, NewsItem } from '../types/news';
import { newsStore } from '../store/newsStore';
import { getLocalStorage } from '../utils/storage';

export const useNews = () => {
  const [settings, setSettings] = useState<NewsSettings>(newsStore.getSettings());
  const userPhrase = getLocalStorage('userPhrase');

  useEffect(() => {
    return newsStore.subscribe(setSettings);
  }, []);

  const filteredItems = settings.items
    .slice(0, settings.display.maxItems)
    .sort((a, b) => b.timestamp - a.timestamp);

  const unreadCount = userPhrase ? filteredItems.filter(item => !item.read).length : 0;

  const addNewsItem = useCallback((item: Omit<NewsItem, 'id' | 'timestamp' | 'read'>) => {
    newsStore.addNewsItem(item);
  }, []);

  const removeNewsItem = useCallback((id: string) => {
    newsStore.removeNewsItem(id);
  }, []);

  const markAsRead = useCallback((id: string) => {
    if (userPhrase) {
      newsStore.markAsRead(id);
    }
  }, [userPhrase]);

  const markAllAsRead = useCallback(() => {
    if (userPhrase) {
      newsStore.markAllAsRead();
    }
  }, [userPhrase]);

  const updateSettings = useCallback((updates: Partial<NewsSettings>) => {
    newsStore.updateSettings(updates);
  }, []);

  return {
    settings,
    items: filteredItems,
    unreadCount,
    addNewsItem,
    removeNewsItem,
    markAsRead,
    markAllAsRead,
    updateSettings
  };
};