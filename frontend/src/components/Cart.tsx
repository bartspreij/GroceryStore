import React, { useState, useEffect } from 'react';
import { CartProduct } from '../domain/cartproduct';
import { getCart, addToCart } from '../utils/cartStorage';

const Cart: React.FC = () => {
    const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);

    useEffect(() => {
        setCartProduct(getCart());
    }, []);

    const handleAddToCart = (item: CartProduct) => {
        addToCart(item);
        setCartProduct(getCart());
    };

    return (
        <div>
            <h2>Cart</h2>
            {cartProduct.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.name} - ${item.price} x {item.quantity}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
