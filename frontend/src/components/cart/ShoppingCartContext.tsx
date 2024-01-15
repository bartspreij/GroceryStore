import React, {
    createContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from 'react';
import Cart from '../../domain/cart';
import { CartProduct } from '../../domain/cart-product';
import { getCart, saveCart } from '../../api/cart.api';

interface ShoppingCartContextValue {
    cart: Cart;
    updateCart: (cart: Cart) => void;
    addProductToCart: (product: CartProduct) => void;
    removeProductFromCart: (product: CartProduct) => void;
    deleteProductFromCart: (product: CartProduct) => void;
}

interface ShoppingCartProviderProps {
    children: ReactNode;
}

const initialContextValue: ShoppingCartContextValue = {
    cart: getCart(),
    updateCart: () => {},
};

const ShoppingCartContext =
    createContext<ShoppingCartContextValue>(initialContextValue);

const CART_KEY = 'groceryCart';

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
    children,
}) => {
    const [cart, setCart] = useState<Cart>(getCart());

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const updateCart = (updatedCart: Cart) => {
        setCart(updatedCart);
        saveCart();
    };

    const addProductToCart = (newItem: CartProduct): void => {
        const existingItem = cart.products.find(
            (item) => item.product.id === newItem.product.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.products.push(newItem);
        }

        saveCart();
    };

    const removeProductFromCart = (itemToRemove: CartProduct): void => {
        const itemIndex = cart.products.findIndex(
            (item) => item.product.id === itemToRemove.product.id
        );

        if (itemIndex < 0) return;

        console.log(cart.products);
        const newProducts = [...cart.products];
        newProducts[itemIndex].quantity -= 1;
        console.log(newProducts);

        if (newProducts[itemIndex].quantity < 1) {
            newProducts.splice(itemIndex, 1);
        }

        const newCart = { ...cart, products: newProducts };
        updateCart(newCart);
    };

    const deleteProductFromCart = (itemToDelete: CartProduct): void => {
        const itemIndex = cart.products.findIndex(
            (item) => item.product.id === itemToDelete.product.id
        );

        cart.products.splice(itemIndex, 1);
        saveCart();
    };

    const contextValue = useMemo(
        () => ({
            cart,
            updateCart,
            addProductToCart,
            removeProductFromCart,
            deleteProductFromCart,
        }),
        [cart]
    );

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;
