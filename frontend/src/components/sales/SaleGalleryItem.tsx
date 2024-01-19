import { useContext } from 'react';
import { Tag } from '../../domain/tag';
import CartButtons from '../cart/CartButtons';
import ShoppingCartContext from '../cart/ShoppingCartContext';
import { Product } from '../../domain/product';

interface Props {
    product: Product;
}

// function roundedPrice(price: number): string {
//     const roundedValue: number = Number((price * 0.7).toFixed(2));
//     return `Now: €${roundedValue}`;
// }

const SaleGalleryItem = ({ product }: Props) => {
    const { getCartProduct } = useContext(ShoppingCartContext);

    return (
        <div className="carousel-item max-w-xs max-h-96">
            <div
                key={product.id}
                className="card text-gray-400 card-compact bg-base-100 shadow-xl"
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
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="line-through">€{product.price}</p>
                    <p>€{product.discounts[0].discountedPrice.toFixed(2)}</p>
                    <div className="card-actions justify-between">
                        <div className="flex flex-wrap items-center gap-1">
                            <span>Tags:</span>
                            {product.tags &&
                                product.tags.map((tag: Tag) => (
                                    <a
                                        className="p-1 bg-slate-400 text-white"
                                        href={`/?c=${tag.name}`}
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </a>
                                ))}
                        </div>
                    </div>
                    <CartButtons item={getCartProduct(product)} />
                </div>
            </div>
        </div>
    );
};

export default SaleGalleryItem;
