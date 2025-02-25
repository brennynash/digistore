import { NewsItem } from '../types/news';

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Products Added',
    preview: 'Check out our latest digital products with special launch discounts!',
    emoji: '🔥',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    read: false,
    type: 'update'
  },
  {
    id: '2',
    title: 'Limited Time Offer',
    preview: 'Get 25% off on bulk orders over 1000 units today only!',
    emoji: '⚡️',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    read: false,
    type: 'promo'
  },
  {
    id: '3',
    title: 'System Maintenance',
    preview: 'Scheduled maintenance in 2 hours. Service will not be interrupted.',
    emoji: '🔧',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    read: true,
    type: 'info'
  },
  {
    id: '4',
    title: 'Security Update',
    preview: 'We have enhanced our security measures to better protect your data.',
    emoji: '🛡️',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    read: true,
    type: 'alert'
  },
  {
    id: '5',
    title: 'Weekend Special',
    preview: 'Double rewards points on all purchases this weekend!',
    emoji: '🎉',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    read: false,
    type: 'promo'
  }
];