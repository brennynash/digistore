import React from 'react';
import { Palette } from 'lucide-react';
import { useThemeContext } from '../../../context/ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, updateTheme } = useThemeContext();

  const themes = [
    { id: 'default', label: 'Default' },
    { id: 'christmas', label: 'Christmas' },
    { id: 'halloween', label: 'Halloween' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Palette size={20} className="text-white/60" />
      <div className="relative">
        <select
        value={currentTheme}
        onChange={(e) => updateTheme(e.target.value)}
        className="appearance-none bg-white/5 border-2 border-white/10 rounded-lg pl-3 pr-8 py-1 text-white text-sm hover:border-white/20 focus:outline-none focus:border-white/30 transition-colors"
      >
        {themes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};