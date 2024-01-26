import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { Product } from '../../domain/product';
import CartButtons from '../cart/CartButtons';
import { useShoppingCart } from '../cart/ShoppingCartContext';
import Tags from './Tags';

interface ProductCardProps {
    product: Product;
    quantity?: number;
    editProduct?: (product: Product) => void;
    deleteProduct?: (product: Product) => void;
    editDiscounts?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    quantity,
    editProduct,
    deleteProduct,
    editDiscounts,
}) => {
    const { getCartProduct } = useShoppingCart();

    return (
        <div
            key={product.id}
            className="card m-2 text-gray-400 card-compact bg-base-100 shadow-xl"
        >
            <figure className="aspect-square">
                <img
                    className="w-full h-full object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                    height="300px"
                    width="300px"
                />
            </figure>

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
                {product.discounts[0] ? (
                    <>
                        <p className="line-through">
                            €{(product.price * (quantity || 1)).toFixed(2)}
                        </p>
                        <p>
                            €
                            {(
                                product.discounts[0].discountedPrice *
                                (quantity || 1)
                            ).toFixed(2)}
                        </p>
                    </>
                ) : (
                    <p>€{(product.price * (quantity || 1)).toFixed(2)}</p>
                )}

                {!!editDiscounts && (
                    <button
                        type="button"
                        title="Edit discounts"
                        className="btn btn-xs btn-circle ml-1"
                        onClick={() => editDiscounts(product)}
                    >
                        %
                    </button>
                )}
            </div>
            <div className="card-actions justify-between">
                <div className="flex flex-wrap items-center gap-1 p-3">
                    <Tags tags={product.tags} />
                    <CartButtons item={getCartProduct(product)} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
