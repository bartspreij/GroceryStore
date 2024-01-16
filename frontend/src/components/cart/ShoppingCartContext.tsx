import { createContext, useMemo, ReactNode, useCallback } from 'react';
import Cart from '../../domain/cart';
import { CartProduct } from '../../domain/cart-product';
import useStorageState from '../../hooks/useStorageState';
import { Product } from '../../domain/product';

interface ShoppingCartContextValue {
    cart: Cart;
    subtotal: number;
    totalQuantity: number;
    getCartProduct: (product: Product) => CartProduct;
    addProductToCart: (product: CartProduct) => void;
    removeProductFromCart: (product: CartProduct) => void;
    deleteProductFromCart: (product: CartProduct) => void;
}

interface ShoppingCartProviderProps {
    children: ReactNode;
}

/**
This solely exists to satisfy a rule
that makes sure that when the context is used outside of the
`ShoppingCartProvider` it is safe to use.
*/
const defaultContextValue: ShoppingCartContextValue = {
    cart: new Cart(),
    subtotal: 0,
    totalQuantity: 0,
    getCartProduct: () => {
        return {
            product: {
                id: 1,
                name: 'Why the f',
                imageUrl: 'www.lmgtfy.com',
                price: 69,
                productTags: [{ id: 1, name: 'cheese' }],
            },
            quantity: 1,
        };
    },
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    deleteProductFromCart: () => {},
};

const ShoppingCartContext =
    createContext<ShoppingCartContextValue>(defaultContextValue);

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
    children,
}) => {
    const [cart, setCart] = useStorageState('cartKey');

    const updateCart = useCallback((): void => {
        const updatedCart = new Cart();
        updatedCart.products = [...cart.products];
        setCart(updatedCart);
    }, [cart, setCart]);

    const addProductToCart = useCallback(
        (newItem: CartProduct): void => {
            const itemToAdd = newItem;

            const existingItem = cart.products.find(
                (item) => item.product.id === itemToAdd.product.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                itemToAdd.quantity = 1;
                cart.products.push(itemToAdd);
            }

            updateCart();
        },
        [cart, updateCart]
    );

    const removeProductFromCart = useCallback(
        (itemToRemove: CartProduct): void => {
            const itemIndex = cart.products.findIndex(
                (item) => item.product.id === itemToRemove.product.id
            );

            if (itemIndex < 0) return;

            cart.products[itemIndex].quantity -= 1;

            if (cart.products[itemIndex].quantity < 1) {
                cart.products.splice(itemIndex, 1);
            }

            updateCart();
        },
        [cart, updateCart]
    );

    const deleteProductFromCart = useCallback(
        (itemToDelete: CartProduct): void => {
            const itemIndex = cart.products.findIndex(
                (item) => item.product.id === itemToDelete.product.id
            );
            cart.products[itemIndex].quantity = 0;
            cart.products.splice(itemIndex, 1);

            updateCart();
        },
        [cart, updateCart]
    );

    const getCartProduct = useCallback(
        (product: Product) => {
            const cartProductFound = cart.products.find(
                (cartProduct) => cartProduct.product.id === product.id
            );
            return cartProductFound || { product, quantity: 0 };
        },
        [cart]
    );

    const subtotal = cart.products.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
    );

    const totalQuantity = cart.products.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const contextValue = useMemo(
        () => ({
            cart,
            subtotal,
            totalQuantity,
            getCartProduct,
            addProductToCart,
            removeProductFromCart,
            deleteProductFromCart,
        }),
        [
            cart,
            subtotal,
            totalQuantity,
            getCartProduct,
            addProductToCart,
            deleteProductFromCart,
            removeProductFromCart,
        ]
    );

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;
