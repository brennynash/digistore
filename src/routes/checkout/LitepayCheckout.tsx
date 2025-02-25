import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LitepayForm } from '../../components/Payment/LitepayForm';

export const LitepayCheckout = () => {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get('amount')) || 0;
  const orderId = searchParams.get('orderId') || '';

  if (!amount || !orderId) {
    return (
      <div className="min-h-screen bg-black grid-pattern flex items-center justify-center">
        <div className="text-white/60">Invalid payment parameters</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black grid-pattern p-6">
      <LitepayForm amount={amount} orderId={orderId} />
    </div>
  );
};