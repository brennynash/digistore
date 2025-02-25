import React from 'react';
import { Filter, DollarSign, Tags } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Filter size={20} />
          Categories
        </h2>
        <div className="space-y-2">
          {['Streaming', 'Gaming', 'Music', 'Design', 'Business'].map((category) => (
            <button
              key={category}
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <DollarSign size={20} />
          Price Range
        </h2>
        <div className="space-y-4 px-4">
          <input
            type="range"
            min="0"
            max="100"
            className="w-full accent-white"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Tags size={20} />
          Popular Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {['Premium', 'New', 'Featured', 'Best Seller'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm hover:bg-white/10 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};