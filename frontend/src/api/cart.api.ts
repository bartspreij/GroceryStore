import Cart from '../domain/cart';
import { CartProduct } from '../domain/cart-product';

const CART_KEY = 'groceryCart';

let cart: Cart | undefined;

export const getCart = (): Cart => {
    if (!cart) {
        cart = new Cart();
        // add localstorage items to cart

        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    }

    return cart;
};

export const saveCart = (): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (newItem: CartProduct): void => {
    cart = getCart();
    const existingItem = cart.products.find((item) => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    } else {
        cart.products.push(newItem);
    }

    saveCart();
};

export const removeFromCart = (productToRemove: CartProduct): void => {
    cart = getCart();
    const itemIndex = cart.products.findIndex(
        (item) => item.id === productToRemove.id
    );

    if (itemIndex !== -1) {
        cart.products[itemIndex].quantity -= 1;

        if (cart.products[itemIndex].quantity < 1) {
            cart.products.splice(itemIndex, 1);
        }
        saveCart();
    }
};
