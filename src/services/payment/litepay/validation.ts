```typescript
import { z } from 'zod';
import { LITEPAY_CONFIG } from './config';

export const customerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  address: z.object({
    street: z.string().min(5).max(100),
    city: z.string().min(2).max(50),
    country: z.string().length(2),
    postalCode: z.string().min(4).max(10)
  })
});

export const paymentRequestSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(LITEPAY_CONFIG.SUPPORTED_CURRENCIES),
  customer: customerSchema,
  orderId: z.string().min(1),
  description: z.string().max(255).optional()
});

export const validatePaymentRequest = (data: unknown) => {
  return paymentRequestSchema.parse(data);
};
```