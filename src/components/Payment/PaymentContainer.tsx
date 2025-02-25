import React from 'react';
import { usePayment } from '../../context/PaymentContext';
import { GlassCard } from '../ui/GlassCard';
import { PaymentMethods } from './PaymentMethods';
import { PaymentSummary } from './PaymentSummary';

interface PaymentContainerProps {
  amount: number;
  orderId: string;
}

export const PaymentContainer: React.FC<PaymentContainerProps> = ({
  amount,
  orderId
}) => {
  const { status, error } = usePayment();

  return (
    <GlassCard className="p-6">
      <div className="space-y-6">
        <PaymentSummary 
          amount={amount}
          orderId={orderId}
        />

        {error && (
          <div className="p-4 bg-red-500/10 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <PaymentMethods 
          amount={amount}
          orderId={orderId}
        />
      </div>
    </GlassCard>
  );
};