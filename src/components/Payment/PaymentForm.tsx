```typescript
import React, { useState } from 'react';
import { litepayAPI } from '../../services/payment/litepay/api';
import { validatePaymentRequest } from '../../services/payment/litepay/validation';
import { paymentLogger } from '../../services/payment/litepay/logger';
import type { PaymentRequest, Currency } from '../../services/payment/litepay/types';

interface PaymentFormProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: Error) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  orderId,
  onSuccess,
  onError
}) => {
  const [currency, setCurrency] = useState<Currency>('CHF');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const paymentRequest: PaymentRequest = {
        amount,
        currency,
        orderId,
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            street: formData.street,
            city: formData.city,
            country: formData.country,
            postalCode: formData.postalCode
          }
        }
      };

      // Validate request
      validatePaymentRequest(paymentRequest);

      // Create payment
      const response = await litepayAPI.createPayment(paymentRequest);
      
      paymentLogger.info('Payment created', { 
        paymentId: response.paymentId 
      });

      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else {
        onSuccess(response.paymentId);
      }
    } catch (error) {
      paymentLogger.error('Payment creation failed', { error });
      onError(error instanceof Error ? error : new Error('Payment failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            email: e.target.value 
          }))}
          placeholder="Email"
          className="col-span-2 p-2 border rounded"
          required
        />
        
        <input
          type="text"
          value={formData.firstName}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            firstName: e.target.value 
          }))}
          placeholder="First Name"
          className="p-2 border rounded"
          required
        />
        
        <input
          type="text"
          value={formData.lastName}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            lastName: e.target.value 
          }))}
          placeholder="Last Name"
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          value={formData.street}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            street: e.target.value 
          }))}
          placeholder="Street Address"
          className="col-span-2 p-2 border rounded"
          required
        />

        <input
          type="text"
          value={formData.city}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            city: e.target.value 
          }))}
          placeholder="City"
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          value={formData.postalCode}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            postalCode: e.target.value 
          }))}
          placeholder="Postal Code"
          className="p-2 border rounded"
          required
        />

        <select
          value={formData.country}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            country: e.target.value 
          }))}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Country</option>
          <option value="CH">Switzerland</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>

        <select
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
          className="p-2 border rounded"
          required
        >
          <option value="CHF">CHF</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Pay {amount} {currency}
        </button>
      </div>
    </form>
  );
};
```