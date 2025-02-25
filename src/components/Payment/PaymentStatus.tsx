```typescript
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { usePayment } from '../../context/PaymentContext';

export const PaymentStatus = () => {
  const { isProcessing, error } = usePayment();

  if (!isProcessing && !error) return null;

  return (
    <div className={`p-4 rounded-lg ${error ? 'bg-red-500/10' : 'bg-blue-500/10'}`}>
      {isProcessing ? (
        <div className="flex items-center gap-2 text-blue-400">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent" />
          Processing payment...
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle size={16} />
          Payment successful!
        </div>
      )}
    </div>
  );
};
```