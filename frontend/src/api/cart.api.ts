import Cart, { dummyCart } from '../domain/cart';
import { CartProduct } from '../domain/cart-product';

const CART_KEY = 'groceryCart';

let cart: Cart | undefined;

export const getCart = (): Cart => {
    const storedCart = localStorage.getItem(CART_KEY);

    if (!storedCart) {
        localStorage.setItem(CART_KEY, JSON.stringify(dummyCart));
        return dummyCart;
    }

    return JSON.parse(storedCart);
};

export const saveCart = (): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addProductToCart = (newItem: CartProduct): void => {
    cart = getCart();
    const existingItem = cart.products.find((item) => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.products.push(newItem);
    }

    saveCart();
};

export const removeProductFromCart = (itemToRemove: CartProduct): void => {
    cart = getCart();
    const itemIndex = cart.products.findIndex(
        (item) => item.id === itemToRemove.id
    );

    if (itemIndex < 0) return;

    cart.products[itemIndex].quantity -= 1;

    if (cart.products[itemIndex].quantity < 1) {
        cart.products.splice(itemIndex, 1);
    }

    saveCart();
};

export const deleteProductFromCart = (itemToDelete: CartProduct): void => {
    cart = getCart();
    const itemIndex = cart.products.findIndex(
        (item) => item.id === itemToDelete.id
    );

    cart.products.splice(itemIndex, 1);
    saveCart();
};

// Calculate total quantity and subtotal
export const getTotalQuantity = (): number => {
    cart = getCart();
    return cart.products.reduce((total, item) => total + item.quantity, 0);
};

export const getSubtotal = (): number => {
    cart = getCart();
    return cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};
