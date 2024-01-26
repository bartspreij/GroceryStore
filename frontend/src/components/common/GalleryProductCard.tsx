import { Product } from '../../domain/product';
import Tags from './Tags';
import { useShoppingCart } from '../cart/ShoppingCartContext';
import CartButtons from '../cart/CartButtons';

interface GalleryProductCardProps {
    product: Product;
    quantity?: number;
    isDiscounted?: boolean;
}

const GalleryProductCard: React.FC<GalleryProductCardProps> = ({
    product,
    quantity,
    isDiscounted = false,
}) => {
    const { getCartProduct } = useShoppingCart();

    return (
        <div
            className="carousel-item max-w-xs max-h-96"
            style={{ maxWidth: '25%' }}
        >
            <div className="card m-2 text-gray-400 card-compact bg-base-100 shadow-xl">
                <figure className="aspect-square">
                    <img
                        className="w-full h-full object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                        height="300px"
                        width="300px"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    {isDiscounted ? (
                        <>
                            <p className="line-through">€{product.price}</p>
                            <p>
                                €
                                {product.discounts[0].discountedPrice.toFixed(
                                    2
                                )}
                            </p>
                        </>
                    ) : (
                        <p>
                            €{quantity && (product.price * quantity).toFixed(2)}
                        </p>
                    )}
                    <Tags tags={product.tags} />
                    <CartButtons
                        item={getCartProduct(product)}
                        isFrequentPurchase={!isDiscounted}
                        quantity={quantity}
                    />
                </div>
            </div>
        </div>
    );
};

export default GalleryProductCard;
