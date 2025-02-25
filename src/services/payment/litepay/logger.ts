```typescript
type LogLevel = 'info' | 'warn' | 'error';

class PaymentLogger {
  private static instance: PaymentLogger;

  private constructor() {}

  static getInstance(): PaymentLogger {
    if (!PaymentLogger.instance) {
      PaymentLogger.instance = new PaymentLogger();
    }
    return PaymentLogger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...data
    };

    // In production, send to logging service
    console[level]('[Payment]', JSON.stringify(logData));
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }
}

export const paymentLogger = PaymentLogger.getInstance();
```