import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../common/Carousel';
import DiscountItem from './DiscountItem';
import { Product } from '../../domain/product';

const DiscountCarousel = () => {
    const [discounts, setDiscounts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/products/onsale'
            );
            setDiscounts(result.data);
            console.log(result.data);
        };
        fetchDiscounts();
    }, []);

    return (
        <Carousel>
            {discounts.map((product) => (
                <DiscountItem key={product.id} product={product} />
            ))}
        </Carousel>
    );
};

export default DiscountCarousel;
