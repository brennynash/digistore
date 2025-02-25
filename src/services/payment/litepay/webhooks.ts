```typescript
import type { WebhookEvent } from './types';
import { paymentLogger } from './logger';

class WebhookHandler {
  private static instance: WebhookHandler;
  private handlers: Map<WebhookEvent['type'], Function[]>;

  private constructor() {
    this.handlers = new Map();
  }

  static getInstance(): WebhookHandler {
    if (!WebhookHandler.instance) {
      WebhookHandler.instance = new WebhookHandler();
    }
    return WebhookHandler.instance;
  }

  subscribe(event: WebhookEvent['type'], handler: Function): () => void {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    this.handlers.set(event, handlers);

    return () => {
      const currentHandlers = this.handlers.get(event) || [];
      this.handlers.set(
        event,
        currentHandlers.filter(h => h !== handler)
      );
    };
  }

  async handleWebhook(event: WebhookEvent): Promise<void> {
    try {
      paymentLogger.info('Webhook received', { event });
      
      const handlers = this.handlers.get(event.type) || [];
      await Promise.all(handlers.map(handler => handler(event)));
      
      paymentLogger.info('Webhook processed successfully', { 
        type: event.type,
        paymentId: event.paymentId 
      });
    } catch (error) {
      paymentLogger.error('Webhook processing failed', { 
        error,
        event 
      });
      throw error;
    }
  }
}

export const webhookHandler = WebhookHandler.getInstance();
```