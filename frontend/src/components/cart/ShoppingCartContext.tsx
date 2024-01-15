import {
    createContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    useCallback,
} from 'react';
import Cart from '../../domain/cart';
import { CartProduct } from '../../domain/cart-product';

interface ShoppingCartContextValue {
    cart: Cart;
    addProductToCart: (product: CartProduct) => void;
    removeProductFromCart: (product: CartProduct) => void;
    deleteProductFromCart: (product: CartProduct) => void;
}

interface ShoppingCartProviderProps {
    children: ReactNode;
}

const CART_KEY = 'groceryCart';

const defaultContextValue: ShoppingCartContextValue = {
    cart: new Cart(),
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    deleteProductFromCart: () => {},
};
const ShoppingCartContext =
    createContext<ShoppingCartContextValue>(defaultContextValue);

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
    children,
}) => {
    const [cart, setCart] = useState<Cart>(new Cart());

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const addProductToCart = useCallback(
        (newItem: CartProduct): void => {
            const existingItem = cart.products.find(
                (item) => item.product.id === newItem.product.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.products.push(newItem);
            }
        },
        [cart]
    );

    const removeProductFromCart = useCallback(
        (itemToRemove: CartProduct): void => {
            const itemIndex = cart.products.findIndex(
                (item) => item.product.id === itemToRemove.product.id
            );

            if (itemIndex < 0) return;
            const newProducts = [...cart.products];
            newProducts[itemIndex].quantity -= 1;

            if (newProducts[itemIndex].quantity < 1) {
                newProducts.splice(itemIndex, 1);
            }

            const updatedCart = new Cart();
            updatedCart.products = newProducts;
            setCart(updatedCart);
        },
        [cart]
    );

    const deleteProductFromCart = useCallback(
        (itemToDelete: CartProduct): void => {
            const itemIndex = cart.products.findIndex(
                (item) => item.product.id === itemToDelete.product.id
            );

            cart.products.splice(itemIndex, 1);

            const newProducts = [...cart.products];
            const updatedCart = new Cart();
            updatedCart.products = newProducts;
            setCart(updatedCart);
        },
        [cart]
    );

    const contextValue = useMemo(
        () => ({
            cart,
            addProductToCart,
            removeProductFromCart,
            deleteProductFromCart,
        }),
        [addProductToCart, cart, deleteProductFromCart, removeProductFromCart]
    );

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;
