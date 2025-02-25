const LOG_PREFIX = '[Initialization]';

export const initLogger = {
  info: (message: string) => {
    console.info(`${LOG_PREFIX} ${message}`);
  },
  error: (message: string, error?: any) => {
    console.error(`${LOG_PREFIX} ${message}`, error);
  },
  warn: (message: string) => {
    console.warn(`${LOG_PREFIX} ${message}`);
  }
};