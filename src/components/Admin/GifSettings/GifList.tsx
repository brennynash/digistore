import React from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import { GifItem } from '../../../types/gif';
import { GlassCard } from '../../ui/GlassCard';

interface GifListProps {
  gifs: GifItem[];
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

export const GifList = ({ gifs, onDelete, onToggleActive }: GifListProps) => {
  if (gifs.length === 0) {
    return (
      <div className="text-center py-8 text-white/60">
        No custom GIFs added yet. Add some to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {gifs.map(gif => (
        <GlassCard key={gif.id} className="p-4">
          <div className="flex gap-4">
            <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={gif.image}
                alt={gif.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{gif.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{gif.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gif.active}
                      onChange={(e) => onToggleActive(gif.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/30"></div>
                  </label>
                  
                  <button
                    onClick={() => onDelete(gif.id)}
                    className="p-2 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="cursor-move p-2 text-white/40 hover:text-white/60">
                    <GripVertical size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};