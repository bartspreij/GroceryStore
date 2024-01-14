import { useEffect, useState } from 'react';
import { CartProduct } from '../../domain/cart-product';
import {
    getCart,
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart,
    getSubtotal,
    getTotalQuantity,
} from '../../api/cart.api';
import CartButtons from './CartButtons';
import Cart from '../../domain/cart';

const ShoppingCart = () => {
    const [cart, setCart] = useState<Cart>(new Cart());

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleAddToCart = (item: CartProduct) => {
        addProductToCart(item);
        setCart(getCart());
    };

    const handleRemoveFromCart = (item: CartProduct) => {
        removeProductFromCart(item);
        setCart(getCart());
    };

    const handleDeleteFromCart = (item: CartProduct) => {
        deleteProductFromCart(item);
        setCart(getCart());
    };

    return (
        <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
                {cart.products.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between mb-2"
                    >
                        <span className="mr-2">
                            {item.name} €
                            {(item.quantity * item.price).toFixed(2)}
                        </span>
                        <CartButtons
                            item={item}
                            onAdd={handleAddToCart}
                            onRemove={handleRemoveFromCart}
                            onDelete={handleDeleteFromCart}
                        />
                    </div>
                ))}
                <span className="font-bold text-lg">
                    {getTotalQuantity()} Items
                </span>
                <span className="text-info">
                    Subtotal: €{getSubtotal().toFixed(2)}
                </span>
                <div className="card-actions">
                    <button type="button" className="btn btn-primary btn-block">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
