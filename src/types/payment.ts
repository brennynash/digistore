export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface PaymentDetails {
  amount: number;
  orderId: string;
  currency: string;
}