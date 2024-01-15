import { useContext } from 'react';
import CartButtons from './CartButtons';
import ShoppingCartContext from './ShoppingCartContext';

const ShoppingCart = () => {
    const { cart } = useContext(ShoppingCartContext);

    const subtotal = cart.products.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
    );

    const totalQuantity = cart.products.reduce(
        (total, item) => total + item.quantity,
        0
    );

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
                        <CartButtons item={item} />
                    </div>
                ))}
                <span className="font-bold text-lg">{totalQuantity} Items</span>
                <span className="text-info">
                    Subtotal: €{subtotal.toFixed(2)}
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
