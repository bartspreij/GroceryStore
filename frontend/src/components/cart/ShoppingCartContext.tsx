import { createContext, useMemo, ReactNode, useCallback } from 'react';
import Cart from '../../domain/cart';
import { CartProduct } from '../../domain/cart-product';
import { Product } from '../../domain/product';
import useStorageState from '../../hooks/useStorageState';

interface ShoppingCartContextValue {
    cart: Cart;
    subtotal: number;
    totalQuantity: number;
    isInCart: (product: CartProduct) => boolean;
    getCartProduct: (product: Product) => CartProduct;
    addProductToCart: (product: Product, quantity: number) => void;
    removeProductFromCart: (product: Product, quantity: number) => void;
    deleteProductFromCart: (product: CartProduct) => void;
    checkout: () => void;
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
    isInCart: () => true,
    getCartProduct: () => {
        return {
            product: {
                id: 1,
                name: 'Why the f',
                imageUrl: 'www.lmgtfy.com',
                price: 69,
                onSale: true,
                tags: [{ id: 1, name: 'cheese', category: false }],
            },
            quantity: 1,
        };
    },
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    deleteProductFromCart: () => {},
    checkout: () => {},
};

const ShoppingCartContext =
    createContext<ShoppingCartContextValue>(defaultContextValue);

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
    children,
}) => {
    const [cart, setCart] = useStorageState('cartKey', new Cart());

    const addProductToCart = useCallback(
        (newItem: Product, quantity: number): void => {
            const existingItem = cart.products.find(
                (item) => item.product.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.products.push({ product: newItem, quantity });
            }

            setCart((prevCart) => new Cart(prevCart.products));
        },
        [cart, setCart]
    );

    const removeProductFromCart = useCallback(
        (itemToRemove: Product, quantity: number): void => {
            const itemIndex = cart.products.findIndex(
                (item) => item.product.id === itemToRemove.id
            );

            if (itemIndex < 0) return;

            cart.products[itemIndex].quantity -= quantity;

            if (cart.products[itemIndex].quantity < 1) {
                cart.products.splice(itemIndex, 1);
            }

            setCart((prevCart) => new Cart(prevCart.products));
        },
        [cart, setCart]
    );

    const deleteProductFromCart = useCallback(
        (itemToDelete: CartProduct) => {
            setCart(
                (prevCart) =>
                    new Cart(
                        prevCart.products.filter(
                            (item) =>
                                item.product.id !== itemToDelete.product.id
                        )
                    )
            );
        },
        [setCart]
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

    const isInCart = useCallback(
        (item: CartProduct) => {
            return cart.products.some(
                (cartProduct) => cartProduct.product.id === item.product.id
            );
        },
        [cart]
    );

    const checkout = useCallback(() => {
        setCart(() => new Cart());
    }, [setCart]);

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
            isInCart,
            getCartProduct,
            addProductToCart,
            removeProductFromCart,
            deleteProductFromCart,
            checkout,
        }),
        [
            cart,
            subtotal,
            totalQuantity,
            isInCart,
            getCartProduct,
            addProductToCart,
            deleteProductFromCart,
            removeProductFromCart,
            checkout,
        ]
    );

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;
