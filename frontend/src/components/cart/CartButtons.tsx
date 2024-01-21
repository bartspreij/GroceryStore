import React, { useContext } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';
import ShoppingCartContext from './ShoppingCartContext';

interface CartButtonProps {
    item: CartProduct;
    isFrequentPurchase?: boolean;
}

const CartButtons: React.FC<CartButtonProps> = ({
    item,
    isFrequentPurchase = false,
}) => {
    const {
        addProductToCart,
        removeProductFromCart,
        deleteProductFromCart,
        isInCart,
    } = useContext(ShoppingCartContext);

    const quantity = isFrequentPurchase && !isInCart(item) ? item.quantity : 1;

    return (
        <div className="join">
            {isInCart(item) && !isFrequentPurchase && (
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
                        onClick={() =>
                            removeProductFromCart(item.product, quantity)
                        }
                        type="button"
                        className="btn btn-xs join-item"
                    >
                        <FaMinus />
                    </button>
                </>
            )}

            {(isInCart(item) || isFrequentPurchase) && (
                <input
                    className={`${isFrequentPurchase ? 'input-' : 'input-xs'} input input-bordered w-16 caret-transparent text-center focus:outline-none focus:ring-0 join-item`}
                    type="number"
                    aria-label="Change product value"
                    pattern="[0-9]{1,2}"
                    max="99"
                    aria-disabled="false"
                    autoComplete="off"
                    value={item.quantity}
                    readOnly
                />
            )}

            <button
                aria-label="Add button"
                onClick={() => addProductToCart(item.product, quantity)}
                type="button"
                className={`btn ${isFrequentPurchase ? 'btn-md' : 'btn-xs'} btn-circle btn-success join-item rounded-r-full`}
                disabled={isFrequentPurchase && isInCart(item)}
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default CartButtons;
