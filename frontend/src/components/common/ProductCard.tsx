import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { Product } from '../../domain/product';
import CartButtons from '../cart/CartButtons';
import { useShoppingCart } from '../cart/ShoppingCartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    quantity?: number;
    isFrequentPurchase: boolean;
    editProduct?: (product: Product) => void;
    deleteProduct?: (product: Product) => void;
    editDiscounts?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    quantity,
    isFrequentPurchase,
    editProduct,
    deleteProduct,
    editDiscounts,
}) => {
    const { getCartProduct } = useShoppingCart();

    return (
        <div
            key={product.id}
            className="card m-2 w-full text-gray-400 card-compact bg-base-100 shadow-xl"
        >
            <Link to={'/product/' + product.id} className="aspect-square">
                <img
                    className="w-full h-full object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                    height="300px"
                    width="300px"
                />
            </Link>

            {!!editProduct && (
                <button
                    aria-label="Edit button"
                    type="button"
                    className="btn btn-sm btn-circle absolute top-1 left-1"
                    onClick={() => editProduct(product)}
                >
                    <MdEdit />
                </button>
            )}

            {!!deleteProduct && (
                <button
                    aria-label="Delete button"
                    type="button"
                    className="btn btn-sm btn-circle btn-error absolute top-1 right-1"
                    onClick={() => deleteProduct(product)}
                >
                    <FaTrashCan />
                </button>
            )}

            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <div>
                    {product.discounts[0] ? (
                        <>
                            <span>
                                €
                                {(
                                    product.discounts[0].discountedPrice *
                                    (quantity || 1)
                                ).toFixed(2)}
                            </span>
                            <span className="line-through text-slate-300 ml-2">
                                €{(product.price * (quantity || 1)).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span>
                            €{(product.price * (quantity || 1)).toFixed(2)}
                        </span>
                    )}

                    {!!editDiscounts && (
                        <button
                            type="button"
                            title="Edit discounts"
                            className="btn btn-xs btn-circle ml-2"
                            onClick={() => editDiscounts(product)}
                        >
                            %
                        </button>
                    )}
                </div>
            </div>
            <div className="flex justify-end w-full pb-2 pr-2">
                <CartButtons
                    item={getCartProduct(product)}
                    isFrequentPurchase={isFrequentPurchase}
                    quantity={quantity}
                />
            </div>
        </div>
    );
};

export default ProductCard;
