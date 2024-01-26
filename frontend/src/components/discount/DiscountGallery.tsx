import { Product } from '../../domain/product';
import ProductCard from '../common/ProductCard';
import Gallery from '../common/Gallery';

interface Props {
    products: Product[];
}

const DiscountGallery = ({ products }: Props) => {
    return (
        <>
            <h2>On Sale</h2>
            <Gallery>
                {products.map((product) => (
                    <div
                        className="carousel-item max-w-xs max-h-96"
                        key={product.id}
                        style={{ maxWidth: '25%' }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </Gallery>
        </>
    );
};

export default DiscountGallery;
