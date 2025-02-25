import React from 'react';
import { Trash2 } from 'lucide-react';
import { NewsItem } from '../../../types/news';
import { formatDistanceToNow } from '../../../utils/formatters';

interface NewsItemListProps {
  items: NewsItem[];
  onDelete: (id: string) => void;
}

export const NewsItemList = ({ items, onDelete }: NewsItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-white/60">
        No news items yet. Add some to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {items.map(item => (
        <div
          key={item.id}
          className="flex items-center gap-3 bg-white/5 rounded-lg p-4 group"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">
            {item.emoji}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{item.title}</h3>
            <p className="text-sm text-white/60 truncate">{item.preview}</p>
            <p className="text-xs text-white/40 mt-1">
              {formatDistanceToNow(item.timestamp)}
            </p>
          </div>

          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};