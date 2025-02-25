import { NewsSettings } from '../types/news';
import { newsItems } from '../data/newsItems';

export const DEFAULT_NEWS_SETTINGS: NewsSettings = {
  items: newsItems,
  display: {
    maxItems: 5,
    showEmoji: true,
    showTimestamp: true,
    animationSpeed: 300,
    colorScheme: 'default'
  },
  autoMarkRead: true,
  notifications: {
    sound: true,
    desktop: false,
    autoHide: true,
    hideDelay: 5
  }
};