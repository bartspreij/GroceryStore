import Cart from '../domain/cart';
import { Product } from '../domain/product';

const CART_KEY = 'groceryCart';

let cart: Cart | undefined;

export const getCart = (): Cart => {
    const storedCart = localStorage.getItem(CART_KEY);

    if (!storedCart) return { id: -1, products: [] };

    return JSON.parse(storedCart);
};

export const getCartProduct = (product: Product) => {
    const match = getCart().products.find((cp) => cp.product.id === product.id);
    return match ?? { product, quantity: 1 };
};

export const saveCart = (): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
