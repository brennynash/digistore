// Secure authentication utilities
import { getLocalStorage, setLocalStorage } from './storage';

interface AuthAttempt {
  timestamp: number;
  success: boolean;
}

const MAX_ATTEMPTS = 3;
const TIMEOUT_DURATION = 1800000; // 30 minutes in milliseconds
const ATTEMPT_WINDOW = 300000; // 5 minutes in milliseconds

export const validateAdminCredentials = (phrase: string, promoCode: string): boolean => {
  const attempts = getAuthAttempts();
  const isLocked = checkLockout();

  if (isLocked) {
    throw new Error('Too many attempts. Please try again later.');
  }

  const isValid = phrase === '/boss/panel' && promoCode === 'boss';
  logAuthAttempt(isValid);

  if (!isValid) {
    checkAndEnforceLockout();
  }

  return isValid;
};

const getAuthAttempts = (): AuthAttempt[] => {
  return getLocalStorage('adminAuthAttempts') || [];
};

const logAuthAttempt = (success: boolean) => {
  const attempts = getAuthAttempts();
  attempts.push({
    timestamp: Date.now(),
    success,
  });
  setLocalStorage('adminAuthAttempts', attempts);
};

const checkLockout = (): boolean => {
  const lockoutUntil = getLocalStorage('adminLockout');
  return lockoutUntil ? Date.now() < lockoutUntil : false;
};

const checkAndEnforceLockout = () => {
  const attempts = getAuthAttempts();
  const recentAttempts = attempts.filter(
    attempt => Date.now() - attempt.timestamp < ATTEMPT_WINDOW
  );

  if (recentAttempts.length >= MAX_ATTEMPTS) {
    setLocalStorage('adminLockout', Date.now() + TIMEOUT_DURATION);
    throw new Error('Too many attempts. Please try again later.');
  }
};

export const clearAuthAttempts = () => {
  setLocalStorage('adminAuthAttempts', []);
  setLocalStorage('adminLockout', null);
};