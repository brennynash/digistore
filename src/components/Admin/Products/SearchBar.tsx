import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative flex-1 max-w-md">
    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border-2 border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
    />
  </div>
);