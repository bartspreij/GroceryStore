import { CartProduct } from '../domain/cartproduct';

const CART_KEY = 'groceryCart';

export const getCart = (): CartProduct[] => {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCart = (cart: CartProduct[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (newItem: CartProduct): void => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    } else {
        cart.push(newItem);
    }

    saveCart(cart);
};

export const removeItemFromCart = (itemToRemove: CartProduct): void => {
    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === itemToRemove.id);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1;

        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
    }
};
