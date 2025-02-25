import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { usePayment } from '../../context/PaymentContext';
import { GlassCard } from '../../components/ui/GlassCard';

export const ThankYou = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setStatus } = usePayment();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    setStatus('success');
  }, [setStatus]);

  return (
    <div className="min-h-screen bg-black grid-pattern flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full p-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
            <p className="text-white/60">
              Thank you for your purchase. Your order {orderId} has been confirmed.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="glass-effect px-6 py-2 rounded-lg text-white hover:bg-white/10"
          >
            Return to Store
          </button>
        </div>
      </GlassCard>
    </div>
  );
};