import { useContext } from 'react';
import { Tag } from '../../domain/tag';
import CartButtons from '../cart/CartButtons';
import ShoppingCartContext from '../cart/ShoppingCartContext';
import { CartProduct } from '../../domain/cart-product';

interface CarouselItemProps {
    cartProduct: CartProduct;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ cartProduct }) => {
    const { getCartProduct } = useContext(ShoppingCartContext);

    return (
        <div className="carousel-item max-w-xs max-h-96">
            <div
                key={cartProduct.product.id}
                className="card w-96 bg-base-100 shadow-xl"
            >
                <figure className="aspect-square">
                    <img
                        className="w-full h-full object-cover"
                        src={cartProduct.product.imageUrl}
                        alt={cartProduct.product.name}
                        height="300px"
                        width="300px"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{cartProduct.product.name}</h2>
                    <p className="line-through">€{cartProduct.product.price}</p>
                    <p>{cartProduct.product.price}</p>
                    <div className="card-actions justify-between">
                        <div className="flex flex-wrap items-center gap-1">
                            <span>Tags:</span>
                            {cartProduct.product.tags &&
                                cartProduct.product.tags.map((tag: Tag) => (
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
                    <CartButtons item={getCartProduct(cartProduct.product)} />
                </div>
            </div>
        </div>
    );
};

export default CarouselItem;
