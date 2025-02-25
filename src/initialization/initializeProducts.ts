import { products } from '../data/products';
import { setLocalStorage } from '../utils/storage';

export const initializeProducts = () => {
  setLocalStorage('products', products);
};