import React, { createContext, useContext, useState } from 'react';
import { NewsItem } from '../types/news';
import { newsItems as defaultNews } from '../data/newsItems';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface NewsContextType {
  items: NewsItem[];
  updateNews: (news: NewsItem[]) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<NewsItem[]>(() => {
    const saved = getLocalStorage('newsItems');
    return saved || defaultNews;
  });

  const updateNews = (news: NewsItem[]) => {
    setItems(news);
    setLocalStorage('newsItems', news);
  };

  return (
    <NewsContext.Provider value={{ items, updateNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};