```typescript
export const LITEPAY_CONFIG = {
  VENDOR_ID: 'ZFM65P',
  API_URL: 'https://api.litepay.ch/v1',
  WEBHOOK_PATH: '/api/webhooks/litepay',
  SUPPORTED_CURRENCIES: ['CHF', 'EUR', 'USD'] as const
};

export const ENDPOINTS = {
  CREATE_PAYMENT: '/payments',
  VERIFY_PAYMENT: '/payments/verify',
  REFUND: '/refunds',
  STATUS: '/status'
};
```