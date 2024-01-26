import { useEffect, useState } from 'react';
import Carousel from '../common/Gallery';
import { Product } from '../../domain/product';
import { fetchDiscountProducts } from '../../api/products-api';
import GalleryProductCard from '../common/GalleryProductCard';

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
            <Carousel>
                {discounts.map((product) => (
                    <GalleryProductCard
                        key={product.id}
                        product={product}
                        isDiscounted
                    />
                ))}
            </Carousel>
        </>
    );
};

export default DiscountGallery;
