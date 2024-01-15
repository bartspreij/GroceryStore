import React, { useContext, useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';
import { addProductToCart, deleteProductFromCart } from '../../api/cart.api';
import ShoppingCartContext from './ShoppingCartContext';

export interface CartButtonProps {
    item: CartProduct;
    onChange: () => void;
}

const CartButtons: React.FC<CartButtonProps> = ({ item, onChange }) => {
    const [product, setProduct] = useState<CartProduct>(item);
    const { removeProductFromCart } = useContext(ShoppingCartContext);

    useEffect(() => {
        setProduct(item);
    }, [item, product, product.quantity]);

    const onAdd = () => {
        addProductToCart(product);
        onChange();
        console.log(item.quantity);
    };

    const onRemove = () => {
        console.log(item);
        removeProductFromCart(item);
    };

    const onDelete = () => {
        deleteProductFromCart(product);
    };

    return (
        <div>
            <button
                onClick={() => onDelete()}
                type="button"
                className="btn btn-xs btn-error"
            >
                <FaTrashCan />
            </button>
            <button
                onClick={onRemove}
                type="button"
                className="btn btn-xs btn-circle"
            >
                <FaMinus />
            </button>
            <input
                className="input input-xs input-primary w-12 caret-transparent text-center focus:outline-none focus:ring-0"
                type="number"
                aria-label="Change product value"
                pattern="[0-9]{1,2}"
                max="99"
                aria-disabled="false"
                autoComplete="off"
                value={product.quantity}
                readOnly
            />
            <button
                onClick={onAdd}
                type="button"
                className="btn btn-xs btn-circle"
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default CartButtons;
