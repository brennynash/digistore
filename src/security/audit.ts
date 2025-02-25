```typescript
interface AuditLog {
  timestamp: number;
  action: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export class AuditLogger {
  private static logs: AuditLog[] = [];
  private static readonly MAX_LOGS = 10000;

  static log(
    action: string,
    details: Record<string, any>,
    userId?: string,
    ipAddress = 'unknown',
    userAgent = 'unknown'
  ): void {
    const log: AuditLog = {
      timestamp: Date.now(),
      action,
      userId,
      ipAddress,
      userAgent,
      details
    };

    this.logs.unshift(log);
    
    // Maintain max size
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // In production, send to secure logging service
    console.info('[AUDIT]', JSON.stringify(log));
  }

  static getRecentLogs(limit = 100): AuditLog[] {
    return this.logs.slice(0, limit);
  }

  static getUserLogs(userId: string, limit = 100): AuditLog[] {
    return this.logs
      .filter(log => log.userId === userId)
      .slice(0, limit);
  }

  static getActionLogs(action: string, limit = 100): AuditLog[] {
    return this.logs
      .filter(log => log.action === action)
      .slice(0, limit);
  }
}
```