```typescript
export type Currency = 'CHF' | 'EUR' | 'USD';

export interface CustomerDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

export interface PaymentRequest {
  amount: number;
  currency: Currency;
  customer: CustomerDetails;
  orderId: string;
  description?: string;
}

export interface PaymentResponse {
  paymentId: string;
  status: PaymentStatus;
  redirectUrl?: string;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface WebhookEvent {
  type: 'payment.success' | 'payment.failed' | 'refund.processed';
  paymentId: string;
  status: PaymentStatus;
  timestamp: number;
  data: Record<string, any>;
}
```