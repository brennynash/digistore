import React from 'react';
import { Bitcoin, Wallet2, CreditCard } from 'lucide-react';
import { usePayment } from '../../context/PaymentContext';
import type { PaymentMethod } from '../../types/payment';

interface PaymentMethodsProps {
  amount: number;
  orderId: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'litepay', name: 'LitePay', icon: CreditCard },
  { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin },
  { id: 'monero', name: 'Monero', icon: Wallet2 }
];

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ amount, orderId }) => {
  const { setStatus } = usePayment();

  const handleMethodSelect = (methodId: string) => {
    if (methodId === 'litepay') {
      setStatus('processing');
      // Redirect to LitePay form
      window.location.href = `/checkout/litepay?amount=${amount}&orderId=${orderId}`;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white font-medium">Select Payment Method</h3>
      <div className="grid grid-cols-3 gap-3">
        {PAYMENT_METHODS.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleMethodSelect(id)}
            className={`
              glass-effect p-4 rounded-lg flex flex-col items-center gap-2 
              transition-all duration-200
              ${id === 'litepay' ? 'ring-2 ring-blue-400/30 hover:ring-blue-400/50' : 'hover:bg-white/10'}
            `}
          >
            <Icon size={24} className="text-white" />
            <span className="text-white text-sm">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};