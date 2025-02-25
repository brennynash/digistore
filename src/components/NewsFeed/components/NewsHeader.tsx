import React from 'react';
import { X, Check } from 'lucide-react';
import { Crown3D } from '../../icons/Crown3D';
import { getLocalStorage } from '../../../utils/storage';

interface NewsHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
  onClose: () => void;
}

export const NewsHeader = ({ unreadCount, onMarkAllRead, onClose }: NewsHeaderProps) => {
  const userPhrase = getLocalStorage('userPhrase');

  return (
    <div className="p-4 border-b border-white/10">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {userPhrase && (
              <div className="glass-effect px-3 py-1 rounded-lg flex items-center gap-2">
                <Crown3D />
                <span className="text-sm text-white">{userPhrase}</span>
              </div>
            )}
          </div>
          {userPhrase && unreadCount > 0 && (
            <p className="text-sm text-white/60 mt-1">
              You have {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {userPhrase && unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
            >
              <Check size={20} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};