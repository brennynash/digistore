import { LITEPAY_CONFIG, ENDPOINTS } from './config';
import type { PaymentRequest, PaymentResponse, PaymentStatus } from './types';
import { PaymentError } from './errors';

class LitepayAPI {
  private static instance: LitepayAPI;
  private readonly baseUrl: string;
  private readonly vendorId: string;

  private constructor() {
    this.baseUrl = LITEPAY_CONFIG.API_URL;
    this.vendorId = LITEPAY_CONFIG.VENDOR_ID;
  }

  static getInstance(): LitepayAPI {
    if (!LitepayAPI.instance) {
      LitepayAPI.instance = new LitepayAPI();
    }
    return LitepayAPI.instance;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${ENDPOINTS.CREATE_PAYMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Vendor-ID': this.vendorId,
        },
        body: JSON.stringify({
          ...request,
          successUrl: `${window.location.origin}/checkout/thank-you?orderId=${request.orderId}`,
          cancelUrl: `${window.location.origin}/checkout/litepay?amount=${request.amount}&orderId=${request.orderId}`
        })
      });

      if (!response.ok) {
        throw new PaymentError('Failed to create payment', response.status);
      }

      return await response.json();
    } catch (error) {
      throw new PaymentError(
        error instanceof Error ? error.message : 'Payment creation failed'
      );
    }
  }

  // ... rest of the class implementation remains the same
}

export const litepayAPI = LitepayAPI.getInstance();