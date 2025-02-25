import React from 'react';

interface PaymentSummaryProps {
  amount: number;
  orderId: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amount,
  orderId
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Payment Summary</h2>
      
      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-white/60">
          <span>Order ID</span>
          <span>{orderId}</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Amount</span>
          <span className="font-bold">€{amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};