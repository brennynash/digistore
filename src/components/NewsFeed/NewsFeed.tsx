import React, { useRef, useState } from 'react';
import { Crown } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { NewsHeader, NewsItem, NewsEmptyState } from './components';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useNews } from '../../hooks/useNews';
import { getLocalStorage } from '../../utils/storage';
import { BentoBox } from '../ui/BentoBox';

interface NewsFeedProps {
  onClose: () => void;
}

export const NewsFeed = ({ onClose }: NewsFeedProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const { items, unreadCount, settings, markAsRead, markAllAsRead } = useNews();
  const userPhrase = getLocalStorage('userPhrase');

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useClickOutside(feedRef, handleClose);

  const handleItemClick = (id: string) => {
    markAsRead(id);
    if (settings.autoMarkRead && settings.notifications.autoHide) {
      setTimeout(handleClose, settings.notifications.hideDelay * 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50">
      <div 
        ref={feedRef}
        className={`
          w-full max-w-md mt-20 mx-4 transition-all duration-300
          ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        `}
      >
        <GlassCard className="overflow-hidden">
          <NewsHeader
            unreadCount={unreadCount}
            onMarkAllRead={markAllAsRead}
            onClose={handleClose}
          />

          {!userPhrase ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <BentoBox className="p-8 text-center max-w-sm">
                <Crown size={48} className="mx-auto mb-4 text-white/60" />
                <h3 className="text-xl font-bold text-white mb-2">Guest Access Required</h3>
                <p className="text-gray-400">Please click "Get Started" to continue viewing news</p>
              </BentoBox>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              {items.length > 0 ? (
                <div className="p-4 space-y-2">
                  {items.map(item => (
                    <NewsItem
                      key={item.id}
                      item={item}
                      onClick={() => handleItemClick(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <NewsEmptyState />
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};