import React from 'react';
import { Bitcoin, Wallet2, ExternalLink } from 'lucide-react';
import { BentoBox } from '../ui/BentoBox';
import { usePayment } from '../../context/PaymentContext';
import { getLocalStorage } from '../../utils/storage';
import { CartItem } from '../../types';

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export const CartSummary = ({ items, subtotal, discount, total }: CartSummaryProps) => {
  const { setStatus } = usePayment();
  const userPhrase = getLocalStorage('userPhrase');

  const handlePayment = () => {
    setStatus('processing');
    // Redirect directly to LitePay
    window.location.href = `/checkout/litepay?amount=${total}&orderId=${userPhrase}`;
  };

  if (!userPhrase) {
    return (
      <BentoBox className="p-4">
        <div className="text-center text-white/60">
          Please click "Get Started" to continue with payment
        </div>
      </BentoBox>
    );
  }

  return (
    <BentoBox className="p-4 space-y-4">
      <div className="space-y-2">
        {/* Product List */}
        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-white/80">
              <span className="truncate flex-1">{item.title}</span>
              <span className="ml-4 whitespace-nowrap">
                {item.quantity}x €{item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-white">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-green-400">
              <span>Discount</span>
              <span>-€{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-white text-lg font-medium">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-white font-medium mb-3">Available Payment Methods</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => window.location.href = `/checkout/litepay?amount=${total}&orderId=${userPhrase}`}
            className="glass-effect p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/10"
          >
            <Bitcoin size={20} className="text-white" />
            <span className="text-white text-sm flex items-center gap-1">
              Bitcoin <ExternalLink size={12} />
            </span>
          </button>
          <button
            onClick={() => window.location.href = `/checkout/litepay?amount=${total}&orderId=${userPhrase}`}
            className="glass-effect p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/10"
          >
            <Wallet2 size={20} className="text-white" />
            <span className="text-white text-sm flex items-center gap-1">
              Monero <ExternalLink size={12} />
            </span>
          </button>
        </div>
      </div>
    </BentoBox>
  );
};