import { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import Gallery from '../common/Gallery';
import { fetchDiscountProducts } from '../../api/discount-api';
import { Product } from '../../domain/product';

const DiscountGallery = () => {
    const [discounts, setDiscounts] = useState<Product[]>([]);

    useEffect(() => {
        const loadDiscounts = async () => {
            const fetchedDiscounts = await fetchDiscountProducts();
            setDiscounts(fetchedDiscounts);
        };

        loadDiscounts();
    }, []);

    return (
        <>
            <h2>On Sale</h2>
            <Gallery>
                {discounts.map((product) => (
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
