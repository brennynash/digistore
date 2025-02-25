import React from 'react';
import { MarqueeAnimation } from '../../../types/news';

interface AnimationSettingsProps {
  animation: MarqueeAnimation;
  onChange: (animation: MarqueeAnimation) => void;
}

export const AnimationSettings = ({ animation, onChange }: AnimationSettingsProps) => {
  const timingFunctions = [
    'linear',
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out'
  ] as const;

  const handleChange = <K extends keyof MarqueeAnimation>(
    key: K,
    value: MarqueeAnimation[K]
  ) => {
    onChange({ ...animation, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Animation Duration (seconds)
        </label>
        <input
          type="number"
          min="1"
          max="60"
          value={animation.duration}
          onChange={(e) => handleChange('duration', Number(e.target.value))}
          className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Timing Function
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {timingFunctions.map((timing) => (
            <button
              key={timing}
              type="button"
              onClick={() => handleChange('timingFunction', timing)}
              className={`px-4 py-2 rounded-lg ${
                animation.timingFunction === timing
                  ? 'glass-effect text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {timing}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Iteration Count
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleChange('iterationCount', 'infinite')}
            className={`px-4 py-2 rounded-lg ${
              animation.iterationCount === 'infinite'
                ? 'glass-effect text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Infinite
          </button>
          <input
            type="number"
            min="1"
            max="100"
            value={animation.iterationCount === 'infinite' ? '' : animation.iterationCount}
            onChange={(e) => handleChange('iterationCount', Number(e.target.value))}
            placeholder="Custom"
            className="w-24 bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Gap Between Items (pixels)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={animation.gap}
          onChange={(e) => handleChange('gap', Number(e.target.value))}
          className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>
    </div>
  );
};