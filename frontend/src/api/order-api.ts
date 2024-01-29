import { CartProduct } from '../domain/cart-product';
import Cart from '../domain/cart';
import { api } from './api';

const uri = `orders`;

export const postOrder = async (order: Cart) => {
  const result = await api.post<Cart>(uri, order);
  return result.data;
};

export const fetchBuyAgainProducts = async (): Promise<CartProduct[]> => {
  try {
    const result = await api.get<CartProduct[]>(`${uri}/frequent-purchases`);
    return result.data;
  } catch {
    return [];
  }
};
