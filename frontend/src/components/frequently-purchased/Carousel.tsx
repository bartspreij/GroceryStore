import { CartProduct } from '../../domain/cart-product';
import CarouselItem from './CarouselItem';

interface CarouselProps {
    cartProducts: CartProduct[];
}

const Carousel: React.FC<CarouselProps> = ({ cartProducts }) => {
    return (
        <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            {cartProducts.map((cartProduct) => (
                <CarouselItem
                    key={cartProduct.product.id}
                    cartProduct={cartProduct}
                />
            ))}
        </div>
    );
};

export default Carousel;
