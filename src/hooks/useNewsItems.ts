import { useState, useCallback, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { useNewsSettings } from './useNewsSettings';

export const useNewsItems = () => {
  const { settings, updateSettings } = useNewsSettings();
  const [items, setItems] = useState<NewsItem[]>(settings.items);

  // Keep items in sync with settings
  useEffect(() => {
    setItems(settings.items);
  }, [settings.items]);

  const markAllAsRead = useCallback(() => {
    const updatedItems = items.map(item => ({ ...item, read: true }));
    updateSettings({ ...settings, items: updatedItems });
  }, [items, settings, updateSettings]);

  const markAsRead = useCallback((id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, read: true } : item
    );
    updateSettings({ ...settings, items: updatedItems });
  }, [items, settings, updateSettings]);

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