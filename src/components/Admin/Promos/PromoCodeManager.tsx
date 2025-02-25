import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePromoCode } from '../../../hooks/usePromoCode';
import { PromoCode } from '../../../types/promo';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { PromoCodeForm } from './PromoCodeForm';
import { PromoCodeList } from './PromoCodeList';
import { ConfirmDialog } from '../../ui/ConfirmDialog';

export const PromoCodeManager = () => {
  const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode } = usePromoCode();
  const [showForm, setShowForm] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [deletingCode, setDeletingCode] = useState<PromoCode | null>(null);

  const handleSubmit = (data: Omit<PromoCode, 'id' | 'createdAt'>) => {
    if (editingCode) {
      updatePromoCode(editingCode.id, data);
    } else {
      addPromoCode(data);
    }
    setShowForm(false);
    setEditingCode(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TitlePanel
          title="Promo Code Management"
          subtitle="Create and manage promotional codes"
          align="left"
          size="small"
        />
        <button
          onClick={() => setShowForm(true)}
          className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Promo Code
        </button>
      </div>

      <PromoCodeList
        promoCodes={promoCodes}
        onEdit={code => {
          setEditingCode(code);
          setShowForm(true);
        }}
        onDelete={code => setDeletingCode(code)}
      />

      {(showForm || editingCode) && (
        <PromoCodeForm
          initialData={editingCode || undefined}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingCode(null);
          }}
        />
      )}

      {deletingCode && (
        <ConfirmDialog
          title="Delete Promo Code"
          message={`Are you sure you want to delete the promo code "${deletingCode.code}"? This action cannot be undone.`}
          confirmLabel="Delete"
          confirmVariant="danger"
          onConfirm={() => {
            deletePromoCode(deletingCode.id);
            setDeletingCode(null);
          }}
          onCancel={() => setDeletingCode(null)}
        />
      )}
    </div>
  );
};