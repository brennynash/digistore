import { InitializationResult } from '../types';

export const validateInitialization = (result: InitializationResult[]): boolean => {
  return result.every(r => r.success);
};