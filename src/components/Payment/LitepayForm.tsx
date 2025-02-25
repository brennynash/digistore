import React, { useEffect } from 'react';
import { usePayment } from '../../context/PaymentContext';
import { GlassCard } from '../ui/GlassCard';

interface LitepayFormProps {
  amount: number;
  orderId: string;
}

export const LitepayForm: React.FC<LitepayFormProps> = ({ amount, orderId }) => {
  const { setStatus, setError } = usePayment();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setStatus('processing');
        
        // Create payment session with LitePay
        const response = await fetch('/api/payments/litepay/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            orderId
          })
        });

        if (!response.ok) throw new Error('Payment initialization failed');

        const { redirectUrl } = await response.json();
        window.location.href = redirectUrl;
      } catch (error) {
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Payment failed');
      }
    };

    initializePayment();
  }, [amount, orderId, setStatus, setError]);

  return (
    <GlassCard className="p-6 max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
        <p className="text-white">Initializing payment...</p>
      </div>
    </GlassCard>
  );
};