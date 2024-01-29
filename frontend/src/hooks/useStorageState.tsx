import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Cart from '../domain/cart';

/**
 * Custom React hook to persist a Cart object in localStorage.
 *
 * This hook is used for managing the state of a Cart object, with its state
 * synchronized with the localStorage. This ensures that the cart's state
 * is preserved across browser sessions.
 *
 * @param {string} key - The key under which the cart data is stored in localStorage.
 * @param {Cart} initialState - The state that the hook gets initialized with when no cart is found in localStorage.
 * @returns {[Cart, Dispatch<SetStateAction<Cart>>]} A stateful value and a function to update it.
 *         The stateful value is the current state of the Cart, and the function
 *         allows updating this state, which will also update the localStorage entry.
 */
const useStorageState = (
  key: string,
  initialState: Cart
): [Cart, Dispatch<SetStateAction<Cart>>] => {
  const [cart, setCart] = useState<Cart>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cart));
  }, [key, cart]);

  return [cart, setCart];
};

export default useStorageState;
