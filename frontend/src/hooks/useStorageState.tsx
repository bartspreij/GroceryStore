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
 * @returns {[Cart, Dispatch<SetStateAction<Cart>>]} A stateful value and a function to update it.
 *         The stateful value is the current state of the Cart, and the function
 *         allows updating this state, which will also update the localStorage entry.
 */
const useStorageState = (
    key: string
): [Cart, Dispatch<SetStateAction<Cart>>] => {
    const [value, setValue] = useState<Cart>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : new Cart();
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useStorageState;
