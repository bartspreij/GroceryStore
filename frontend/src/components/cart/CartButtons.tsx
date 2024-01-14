import React from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';

interface CartButtonProps {
    item: CartProduct;
    onAdd: (item: CartProduct) => void;
    onRemove: (item: CartProduct) => void;
    onDelete: (item: CartProduct) => void;
}

const CartButtons: React.FC<CartButtonProps> = ({
    item,
    onAdd,
    onRemove,
    onDelete,
}) => {
    return (
        <>
            <button
                onClick={() => onDelete(item)}
                type="button"
                className="btn btn-xs btn-error"
            >
                <FaTrashCan />
            </button>
            <button
                onClick={() => onRemove(item)}
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
                value={item.quantity}
                readOnly
            />
            <button
                onClick={() => onAdd(item)}
                type="button"
                className="btn btn-xs btn-circle"
            >
                <FaPlus />
            </button>
        </>
    );
};

export default CartButtons;
