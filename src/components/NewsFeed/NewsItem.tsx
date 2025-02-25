import React from 'react';
import { formatDistanceToNow } from '../../utils/formatters';
import { NewsItem as NewsItemType } from '../../types/news';
import { NEWS_TYPE_COLORS } from './constants';

interface NewsItemProps {
  item: NewsItemType;
  onClick: () => void;
}

export const NewsItem = ({ item, onClick }: NewsItemProps) => (
  <div 
    className={`
      p-4 rounded-lg transition-all duration-200 cursor-pointer
      ${item.read ? 'bg-white/5' : 'bg-white/10'}
      hover:bg-white/15
    `}
    onClick={onClick}
  >
    <div className="flex gap-3">
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center text-lg
        ${NEWS_TYPE_COLORS[item.type]}
      `}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium mb-1 ${item.read ? 'text-white/60' : 'text-white'}`}>
          {item.title}
        </h3>
        <p className="text-sm text-white/60 line-clamp-2">
          {item.preview}
        </p>
        <div className="mt-2 text-xs text-white/40">
          {formatDistanceToNow(item.timestamp)}
        </div>
      </div>
      {!item.read && (
        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
      )}
    </div>
  </div>
);