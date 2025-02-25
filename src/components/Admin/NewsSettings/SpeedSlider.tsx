import React from 'react';

interface SpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const SpeedSlider = ({ value, onChange }: SpeedSliderProps) => {
  return (
    <div className="space-y-2">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
      <div className="flex justify-between text-sm text-white/60">
        <span>Slower</span>
        <span>Faster</span>
      </div>
    </div>
  );
};