import React, { useContext } from 'react';
import ShoppingCartContext from '../cart/ShoppingCartContext';
import CartButtons from '../cart/CartButtons';
import { Product } from '../../domain/product';
import Tags from './Tags';

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
    const { getCartProduct } = useContext(ShoppingCartContext);
    const displayPrice = isDiscounted
        ? Number((product.price * 0.7).toFixed(2))
        : product.price;

    return (
        <div className="carousel-item max-w-xs max-h-96">
            <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
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
                            <p>Now: €{displayPrice}</p>
                        </>
                    ) : (
                        <p>
                            Price: €
                            {quantity
                                ? (displayPrice * quantity).toFixed(2)
                                : displayPrice}
                        </p>
                    )}

                    <div className="card-actions justify-between">
                        <Tags tags={product.tags} />
                    </div>

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
