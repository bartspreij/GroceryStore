import CartButtons from './CartButtons';
import { useShoppingCart } from './ShoppingCartContext';

const ShoppingCart = () => {
  const { cart, checkout, totalQuantity, subtotal } = useShoppingCart();

  return (
    <div className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
      <div className="card-body">
        {cart.orderProducts.map((item) => (
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
        <span className="text-info">Subtotal: €{subtotal.toFixed(2)}</span>
        <div className="card-actions">
          <button
            onClick={checkout}
            type="button"
            className="btn btn-primary btn-block"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
