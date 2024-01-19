import React, { useContext } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';
import ShoppingCartContext from './ShoppingCartContext';

interface CartButtonProps {
    item: CartProduct;
    quantityToAdd: number;
}

const CartButtons: React.FC<CartButtonProps> = ({
    item,
    quantityToAdd = 1,
}) => {
    const {
        addProductToCart,
        removeProductFromCart,
        deleteProductFromCart,
        isInCart,
    } = useContext(ShoppingCartContext);

    return (
        <div className="join">
            {isInCart(item) && (
                <>
                    <button
                        aria-label="Delete button"
                        onClick={() => deleteProductFromCart(item)}
                        type="button"
                        className="btn btn-xs btn-error join-item rounded-r-full"
                    >
                        <FaTrashCan />
                    </button>
                    <button
                        aria-label="Remove button"
                        onClick={() => removeProductFromCart(item)}
                        type="button"
                        className="btn btn-xs join-item"
                    >
                        <FaMinus />
                    </button>
                    <input
                        className="input input-xs input-bordered w-12 caret-transparent text-center focus:outline-none focus:ring-0 join-item"
                        type="number"
                        aria-label="Change product value"
                        pattern="[0-9]{1,2}"
                        max="99"
                        aria-disabled="false"
                        autoComplete="off"
                        value={item.quantity}
                        readOnly
                    />
                </>
            )}
            <button
                aria-label="Add button"
                onClick={() => addProductToCart(item, quantityToAdd)}
                type="button"
                className={
                    isInCart(item)
                        ? 'btn btn-xs  join-item rounded-r-full'
                        : 'btn btn-xs btn-circle btn-success'
                }
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default CartButtons;
