import React, { useContext } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { CartProduct } from '../../domain/cart-product';
import ShoppingCartContext from './ShoppingCartContext';

interface CartButtonProps {
    item: CartProduct;
    isFrequentPurchase?: boolean;
    quantity?: number;
}

const CartButtons: React.FC<CartButtonProps> = ({
    item,
    isFrequentPurchase = false,
    quantity: defaultQuantity = 1,
}) => {
    const {
        addProductToCart,
        removeProductFromCart,
        deleteProductFromCart,
        isInCart,
    } = useContext(ShoppingCartContext);

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
                            removeProductFromCart(item.product, defaultQuantity)
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
                    className={`${isFrequentPurchase ? 'input-xl w-16' : 'input-xs w-12'} input input-bordered caret-transparent text-center focus:outline-none focus:ring-0 join-item`}
                    type="number"
                    aria-label="Change product value"
                    pattern="[0-9]{1,2}"
                    max="99"
                    aria-disabled="false"
                    autoComplete="off"
                    value={isInCart(item) ? item.quantity : defaultQuantity}
                    readOnly
                />
            )}

            <button
                aria-label="Add button"
                onClick={() => addProductToCart(item.product, defaultQuantity)}
                type="button"
                className={`btn ${isFrequentPurchase ? 'btn-md btn-success' : 'btn-xs'} ${!isInCart(item) ? 'btn-success' : ''} btn-circle join-item rounded-r-full`}
                disabled={isFrequentPurchase && isInCart(item)}
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default CartButtons;
