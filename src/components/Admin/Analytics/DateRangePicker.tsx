import React from 'react';

interface DateRangeOption {
  value: string;
  label: string;
}

interface DateRangePickerProps {
  value: string;
  onChange: (value: any) => void;
  options: DateRangeOption[];
}

export const DateRangePicker = ({ value, onChange, options }: DateRangePickerProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden bg-white/5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-sm transition-colors ${
            value === option.value
              ? 'bg-white/10 text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}