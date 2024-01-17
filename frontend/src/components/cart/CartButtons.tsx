import React, { useContext } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';
import ShoppingCartContext from './ShoppingCartContext';

interface CartButtonProps {
    item: CartProduct;
}

const CartButtons: React.FC<CartButtonProps> = ({ item }) => {
    const {
        addProductToCart,
        removeProductFromCart,
        deleteProductFromCart,
        isInCart,
    } = useContext(ShoppingCartContext);

    const itemInCart = isInCart(item);

    return (
        <div>
            {itemInCart && (
                <>
                    <button
                        onClick={() => deleteProductFromCart(item)}
                        type="button"
                        className="btn btn-xs btn-error"
                    >
                        <FaTrashCan />
                    </button>
                    <button
                        onClick={() => removeProductFromCart(item)}
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
                </>
            )}
            <button
                onClick={() => addProductToCart(item)}
                type="button"
                className={
                    itemInCart
                        ? 'btn btn-xs btn-circle'
                        : 'btn btn-xs btn-circle btn-success'
                }
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default CartButtons;
