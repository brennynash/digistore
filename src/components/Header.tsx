import React, { useState } from 'react';
import { Home, MessageCircle, Star, ShoppingCart, AlertTriangle, Ghost, Sun } from 'lucide-react';
import { ProfileForm } from './ProfileForm';
import { Crown3D } from './icons/Crown3D';
import { useCart } from '../context/CartContext';
import { useThemeContext } from '../context/ThemeContext';
import { setLocalStorage, getLocalStorage } from '../utils/storage';
import { NewsFeed } from './NewsFeed/NewsFeed';

export const Header = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showNewsFeed, setShowNewsFeed] = useState(false);
  const [userPhrase, setUserPhrase] = useState<string | null>(getLocalStorage('userPhrase'));
  const { items, setIsOpen } = useCart();
  const { currentTheme, updateTheme, toggleTheme } = useThemeContext();

  const handleProfileSubmit = (phrase: string) => {
    setUserPhrase(phrase);
    setLocalStorage('userPhrase', phrase);
    setShowProfileForm(false);
  };

  const handleButtonClick = () => {
    if (userPhrase) {
      setUserPhrase(null);
      setLocalStorage('userPhrase', null);
    } else {
      setShowProfileForm(true);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4 safe-area-inset">
        <div className="flex justify-between items-center">
          <button 
            className="bento-box btn btn-gradient-border rounded-lg sm:rounded-xl px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-white font-medium flex items-center gap-1.5 sm:gap-2 relative get-started-btn text-sm sm:text-base"
            onClick={handleButtonClick}
          >
            {userPhrase ? (
              <>
                <Crown3D />
                <span>Guest</span>
              </>
            ) : (
              <>
                <span>Get Started</span>
                <div className="ghost-container">
                  <Ghost size={20} className="ghost-icon sm:w-5 sm:h-5" />
                </div>
              </>
            )}
          </button>
          
          <div className="flex gap-0.5 sm:gap-2">
            {[
              { icon: Home, label: 'Home', action: () => {} },
              { 
                icon: currentTheme === 'light' ? AlertTriangle : Sun, 
                label: 'Toggle Theme', 
                action: () => toggleTheme() 
              },
              { icon: MessageCircle, label: 'Messages', action: () => setShowNewsFeed(true) },
              { icon: Star, label: 'Favorites', action: () => {} }
            ].map((item, index) => (
              <button 
                key={index} 
                className="bento-box btn btn-magnetic rounded-lg sm:rounded-xl p-2 sm:p-3.5"
                onClick={item.action}
                aria-label={item.label}
              >
                <item.icon size={16} className="text-white sm:w-5 sm:h-5" />
              </button>
            ))}
          </div>

          <button 
            className="bento-box btn btn-pulse rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart size={16} className="text-white sm:w-5 sm:h-5" />
            <span className="text-white font-medium">{totalItems}</span>
          </button>
        </div>
      </header>

      {showProfileForm && (
        <ProfileForm
          onSubmit={handleProfileSubmit}
          onClose={() => setShowProfileForm(false)}
        />
      )}

      {showNewsFeed && (
        <NewsFeed onClose={() => setShowNewsFeed(false)} />
      )}
    </>
  );
};