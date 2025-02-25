import React, { createContext, useContext, useState } from 'react';
import type { PaymentStatus } from '../types/payment';

interface PaymentContextType {
  status: PaymentStatus;
  setStatus: (status: PaymentStatus) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  return (
    <PaymentContext.Provider value={{
      status,
      setStatus,
      error,
      setError
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};