import React, { useState, useEffect } from 'react';
import { CartProduct, sampleProducts } from '../domain/cartproduct';
import { getCart, addToCart } from '../utils/cartStorage';

const Cart: React.FC = () => {
    const [cartProduct, setCartProduct] =
        useState<CartProduct[]>(sampleProducts);

    // useEffect(() => {
    //     setCartProduct(getCart());
    // }, []);

    const handleAddToCart = (item: CartProduct) => {
        addToCart(item);
        setCartProduct(getCart());
    };

    return (
        <div className="flex content-center flex-col">
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
