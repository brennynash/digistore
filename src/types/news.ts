export interface NewsItem {
  id: string;
  title: string;
  preview: string;
  emoji: string;
  timestamp: number;
  read: boolean;
  type: 'update' | 'alert' | 'promo' | 'info';
}

export interface NewsSettings {
  items: NewsItem[];
  display: {
    maxItems: number;
    showEmoji: boolean;
    showTimestamp: boolean;
    animationSpeed: number;
    colorScheme: 'default' | 'muted' | 'vibrant';
  };
  autoMarkRead: boolean;
  notifications: {
    sound: boolean;
    desktop: boolean;
    autoHide: boolean;
    hideDelay: number;
  };
}

export interface NewsFeedProps {
  onClose: () => void;
}