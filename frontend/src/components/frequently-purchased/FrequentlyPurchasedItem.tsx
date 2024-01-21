import { Tag } from '../../domain/tag';
import CartButtons from '../cart/CartButtons';
import { CartProduct } from '../../domain/cart-product';

interface CarouselItemProps {
    cartProduct: CartProduct;
}

const FrequentlyPurchasedItem: React.FC<CarouselItemProps> = ({
    cartProduct,
}) => {
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
                    <p>
                        Price: €
                        {(
                            cartProduct.product.price * cartProduct.quantity
                        ).toFixed(2)}
                    </p>
                    <div className="card-actions justify-between">
                        <div className="flex flex-wrap items-center gap-1">
                            <span>
                                <h3>Quick add</h3>
                            </span>
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
                    <CartButtons item={cartProduct} isFrequentPurchase />
                </div>
            </div>
        </div>
    );
};

export default FrequentlyPurchasedItem;
