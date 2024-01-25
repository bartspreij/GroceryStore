import { createContext, useMemo, ReactNode, useCallback } from 'react';
import Cart from '../../domain/cart';
import { CartProduct } from '../../domain/cart-product';
import { Product } from '../../domain/product';
import useStorageState from '../../hooks/useStorageState';
import { postOrder } from '../../api/order-api';

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
                id: 7,
                name: 'Apples',
                description: 'Crisp and juicy apples for a healthy snack.',
                price: 1.99,
                imageUrl:
                    'https://static.ah.nl/dam/product/AHI_43545239383933333036?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary',
                onSale: true,
                tags: [
                    {
                        id: 5,
                        name: 'Fruits',
                        category: true,
                    },
                ],
                discounts: [
                    {
                        id: 1,
                        discountedPrice: 1.59,
                        startDate: new Date('2024-01-22'),
                        endDate: new Date('2024-01-29'),
                    },
                ],
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
            const existingItem = cart.orderProducts.find(
                (item) => item.product.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.orderProducts.push({ product: newItem, quantity });
            }

            setCart((prevCart) => new Cart(prevCart.orderProducts));
        },
        [cart, setCart]
    );

    const removeProductFromCart = useCallback(
        (itemToRemove: Product, quantity: number): void => {
            const itemIndex = cart.orderProducts.findIndex(
                (item) => item.product.id === itemToRemove.id
            );

            if (itemIndex < 0) return;

            cart.orderProducts[itemIndex].quantity -= quantity;

            if (cart.orderProducts[itemIndex].quantity < 1) {
                cart.orderProducts.splice(itemIndex, 1);
            }

            setCart((prevCart) => new Cart(prevCart.orderProducts));
        },
        [cart, setCart]
    );

    const deleteProductFromCart = useCallback(
        (itemToDelete: CartProduct) => {
            setCart(
                (prevCart) =>
                    new Cart(
                        prevCart.orderProducts.filter(
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
            const cartProductFound = cart.orderProducts.find(
                (cartProduct) => cartProduct.product.id === product.id
            );
            return cartProductFound || { product, quantity: 0 };
        },
        [cart]
    );

    const isInCart = useCallback(
        (item: CartProduct) => {
            return cart.orderProducts.some(
                (cartProduct) => cartProduct.product.id === item.product.id
            );
        },
        [cart]
    );

    const checkout = useCallback(async () => {
        try {
            await postOrder(cart);
            setCart(() => new Cart());
        } catch {
            console.error('Unable to post cart. Display this somewhere.');
        }
    }, [setCart]);

    const subtotal = cart.orderProducts.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
    );

    const totalQuantity = cart.orderProducts.reduce(
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
