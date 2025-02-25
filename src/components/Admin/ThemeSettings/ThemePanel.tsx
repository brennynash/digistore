import React, { useState } from 'react';
import { Palette, Snowflake, Ghost, Sun, Moon } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { useThemeContext } from '../../../context/ThemeContext';

const THEMES = [
  {
    id: 'default',
    name: 'Default',
    icon: Palette,
    colors: {
      primary: '#ffffff',
      secondary: '#000000',
      accent: '#646cff'
    }
  },
  {
    id: 'christmas',
    name: 'Christmas',
    icon: Snowflake,
    colors: {
      primary: '#ff0f0f',
      secondary: '#115c2a',
      accent: '#ffffff',
      effects: {
        snow: true,
        lights: true
      }
    }
  },
  {
    id: 'halloween',
    name: 'Halloween',
    icon: Ghost,
    colors: {
      primary: '#ff6b01',
      secondary: '#2e0152',
      accent: '#76ff03',
      effects: {
        fog: true,
        spiders: true
      }
    }
  },
  {
    id: 'light',
    name: 'Light Mode',
    icon: Sun,
    colors: {
      primary: '#ffffff',
      secondary: '#1a1a1a',
      accent: '#646cff'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    icon: Moon,
    colors: {
      primary: '#1a1a1a',
      secondary: '#ffffff',
      accent: '#646cff'
    }
  }
];

export const ThemePanel = () => {
  const { currentTheme, updateTheme } = useThemeContext();
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  const handleThemeSelect = (themeId: string) => {
    updateTheme(themeId);
  };

  return (
    <div className="space-y-6">
      <TitlePanel
        title="Theme Settings"
        subtitle="Customize your store's appearance"
        align="left"
        size="small"
        variant="default"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          const isActive = currentTheme === theme.id;
          const isPreview = previewTheme === theme.id;

          return (
            <GlassCard
              key={theme.id}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                isActive ? 'ring-2 ring-white/30 transform scale-105' : ''
              } ${isPreview ? 'scale-105' : ''}`}
              onMouseEnter={() => setPreviewTheme(theme.id)}
              onMouseLeave={() => setPreviewTheme(null)}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className="flex items-center gap-4 relative overflow-hidden">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <Icon 
                    size={24} 
                    style={{ color: theme.colors.secondary }}
                    className="transition-transform hover:rotate-12"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {theme.name}
                  </h3>
                  <div className="flex gap-2 mt-2 animate-pulse">
                    {Object.entries(theme.colors).map(([key, color]) => (
                      key !== 'effects' && (
                      <div
                        key={key}
                        className="w-6 h-6 rounded-full border-2 border-white/10"
                        style={{ backgroundColor: color }}
                        title={key}
                      />
                      )
                    ))}
                  </div>
                  {theme.colors.effects && (
                    <div className="mt-2 text-xs text-white/60">
                      Special effects: {Object.keys(theme.colors.effects).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: THEMES.find(t => t.id === (previewTheme || currentTheme))?.colors.primary,
              color: THEMES.find(t => t.id === (previewTheme || currentTheme))?.colors.secondary
            }}
          >
            <h4 className="text-xl font-bold">Sample Content</h4>
            <p className="mt-2">This is how your content will look with the selected theme.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};