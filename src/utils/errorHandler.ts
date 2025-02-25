import { initLogger } from '../initialization/utils/logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof AppError) {
    initLogger.error(`[${error.code}] ${error.message}`);
    // Add stack trace in development
    if (import.meta.env.DEV) {
      console.error(error.stack);
    }
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode
    };
  }
  
  // Handle primitive error values
  if (typeof error === 'object' && error !== null) {
    return {
      code: 'OBJECT_ERROR',
      message: String(error),
      statusCode: 500
    };
  }

  const genericError = {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500
  };

  initLogger.error(`[${genericError.code}] ${error instanceof Error ? error.message : 'Unknown error'}`);
  return genericError;
};

export const SYNC_ERRORS = {
  IN_PROGRESS: new AppError('Sync operation already in progress', 'SYNC_IN_PROGRESS', 409),
  TIMEOUT: new AppError('Sync operation timed out', 'SYNC_TIMEOUT', 408),
  FAILED: new AppError('Sync operation failed', 'SYNC_FAILED', 500)
} as const;