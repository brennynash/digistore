import { NewsSettings, NewsItem } from '../types/news';
import { DEFAULT_NEWS_SETTINGS } from '../constants/newsSettings';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

class NewsStore {
  private static instance: NewsStore;
  private settings: NewsSettings;
  private listeners: Set<(settings: NewsSettings) => void>;

  private constructor() {
    this.settings = this.loadSettings();
    this.listeners = new Set();
  }

  static getInstance(): NewsStore {
    if (!NewsStore.instance) {
      NewsStore.instance = new NewsStore();
    }
    return NewsStore.instance;
  }

  private loadSettings(): NewsSettings {
    const saved = getLocalStorage('newsSettings');
    if (!saved) return DEFAULT_NEWS_SETTINGS;

    return {
      ...DEFAULT_NEWS_SETTINGS,
      ...saved,
      items: [...(saved.items || [])],
      display: { ...DEFAULT_NEWS_SETTINGS.display, ...(saved.display || {}) },
      notifications: { ...DEFAULT_NEWS_SETTINGS.notifications, ...(saved.notifications || {}) }
    };
  }

  private saveSettings(): void {
    setLocalStorage('newsSettings', this.settings);
    this.notifyListeners();
  }

  getSettings(): NewsSettings {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<NewsSettings>): void {
    this.settings = {
      ...this.settings,
      ...updates,
      display: { ...this.settings.display, ...updates.display },
      notifications: { ...this.settings.notifications, ...updates.notifications }
    };
    this.saveSettings();
  }

  addNewsItem(item: Omit<NewsItem, 'id' | 'timestamp' | 'read'>): void {
    const newItem: NewsItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      read: false,
      ...item
    };

    this.settings.items = [newItem, ...this.settings.items];
    this.saveSettings();
  }

  removeNewsItem(id: string): void {
    this.settings.items = this.settings.items.filter(item => item.id !== id);
    this.saveSettings();
  }

  markAsRead(id: string): void {
    this.settings.items = this.settings.items.map(item =>
      item.id === id ? { ...item, read: true } : item
    );
    this.saveSettings();
  }

  markAllAsRead(): void {
    this.settings.items = this.settings.items.map(item => ({ ...item, read: true }));
    this.saveSettings();
  }

  updateNews(news: NewsItem[]): void {
    this.settings = {
      ...this.settings,
      items: news
    };
    this.saveSettings();
  }

  subscribe(listener: (settings: NewsSettings) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getSettings()));
  }
}

export const newsStore = NewsStore.getInstance();