import React from 'react';
import { NewsSettings } from '../../../types/news';
import { NewsItem } from '../../NewsFeed/NewsItem';

interface NewsPreviewProps {
  settings: NewsSettings;
}

export const NewsPreview = ({ settings }: NewsPreviewProps) => {
  const previewItems = settings.items.slice(0, settings.display.maxItems);

  return (
    <div className="space-y-2">
      {previewItems.map(item => (
        <NewsItem
          key={item.id}
          item={{
            ...item,
            emoji: settings.display.showEmoji ? item.emoji : '',
          }}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};