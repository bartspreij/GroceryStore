import { useEffect, useState } from 'react';
import Carousel from '../common/Gallery';
import DiscountItem from './DiscountItem';
import { Product } from '../../domain/product';
import { fetchDiscounts } from '../../api/products-api';

const DiscountGallery = () => {
    const [discounts, setDiscounts] = useState<Product[]>([]);

    useEffect(() => {
        const loadDiscounts = async () => {
            const fetchedDiscounts = await fetchDiscounts();
            setDiscounts(fetchedDiscounts);
        };

        loadDiscounts();
    }, []);

    return (
        <>
            <h2>On Sale</h2>
            <Carousel>
                {discounts.map((product) => (
                    <DiscountItem key={product.id} product={product} />
                ))}
            </Carousel>
        </>
    );
};

export default DiscountGallery;
