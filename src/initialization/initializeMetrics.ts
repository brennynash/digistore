import { setLocalStorage } from '../utils/storage';

export const initializeMetrics = () => {
  const initialMetrics = {
    sales: 0,
    customers: 0,
    lastUpdate: Date.now()
  };
  
  setLocalStorage('sharedMetrics', initialMetrics);
};