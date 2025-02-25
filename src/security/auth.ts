```typescript
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomUUID();
const SESSION_DURATION = '24h';

export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
  ipAddress: string;
  userAgent: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return compare(password, hash);
};

export const createSession = (userId: string, ipAddress: string, userAgent: string): Session => {
  return {
    id: crypto.randomUUID(),
    userId,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    ipAddress,
    userAgent
  };
};

export const createToken = (session: Session): string => {
  return sign({ sessionId: session.id }, JWT_SECRET, { expiresIn: SESSION_DURATION });
};

export const verifyToken = (token: string): { sessionId: string } | null => {
  try {
    return verify(token, JWT_SECRET) as { sessionId: string };
  } catch {
    return null;
  }
};
```