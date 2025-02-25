import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNews } from '../../../hooks/useNews';
import { GlassCard } from '../../ui/GlassCard';
import { NewsItemList } from './NewsItemList';
import { NewsItemForm } from './NewsItemForm';

export const NewsItemManager = () => {
  const [showForm, setShowForm] = useState(false);
  const { items, addNewsItem, removeNewsItem } = useNews();

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">News Items</h2>
        <button
          onClick={() => setShowForm(true)}
          className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Plus size={20} />
          Add News
        </button>
      </div>

      <NewsItemList items={items} onDelete={removeNewsItem} />

      {showForm && (
        <NewsItemForm
          onSubmit={(item) => {
            addNewsItem(item);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </GlassCard>
  );
};