import { useState, useCallback, useEffect } from 'react';
import { NewsItem } from '../../../types/news';
import { useNewsSettings } from '../../../hooks/useNewsSettings';
import { getLocalStorage, setLocalStorage } from '../../../utils/storage';

export const useNewsItems = () => {
  const { settings, updateSettings } = useNewsSettings();
  const [items, setItems] = useState<NewsItem[]>(() => {
    const savedItems = getLocalStorage('newsItems');
    return savedItems || settings.items;
  });

  // Save items to localStorage and update settings
  useEffect(() => {
    setLocalStorage('newsItems', items);
    updateSettings({ ...settings, items });
  }, [items]);

  const markAllAsRead = useCallback(() => {
    setItems(current =>
      current.map(item => ({ ...item, read: true }))
    );
  }, []);

  const markAsRead = useCallback((id: string) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }, []);

  // Apply settings filters and sort by timestamp
  const filteredItems = items
    .slice(0, settings.display.maxItems)
    .sort((a, b) => b.timestamp - a.timestamp);

  const unreadCount = filteredItems.filter(item => !item.read).length;

  return {
    items: filteredItems,
    unreadCount,
    markAllAsRead,
    markAsRead
  };
};