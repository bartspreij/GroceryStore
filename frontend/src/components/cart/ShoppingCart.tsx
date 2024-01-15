import { useEffect, useState } from 'react';
import { getCart, getSubtotal, getTotalQuantity } from '../../api/cart.api';
import CartButtons from './CartButtons';
import Cart from '../../domain/cart';

const ShoppingCart = () => {
    const [cart, setCart] = useState<Cart>(new Cart());

    useEffect(() => {
        setCart(getCart());
    }, []);

    return (
        <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
                {cart.products.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex items-center justify-between mb-2"
                    >
                        <span className="mr-2">
                            {item.product.name} €
                            {(item.quantity * item.product.price).toFixed(2)}
                        </span>
                        <CartButtons
                            item={item}
                            onChange={() => setCart(getCart())}
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
