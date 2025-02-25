import { newsStore } from '../newsStore';

export const syncNews = (news?: any[]): void => {
  if (!news) return;
  newsStore.updateNews(news);
};