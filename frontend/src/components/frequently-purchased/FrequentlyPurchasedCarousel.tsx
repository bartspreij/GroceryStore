import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../common/Carousel';
import { CartProduct } from '../../domain/cart-product';
import FrequentlyPurchasedItem from './FrequentlyPurchasedItem';

const FrequentlyPurchasedCarousel = () => {
    const [frequentPurchases, setFrequentPurchases] = useState<CartProduct[]>(
        []
    );

    useEffect(() => {
        const fetchFrequentPurchases = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/orders/user/1/frequent-purchases'
            );
            setFrequentPurchases(result.data);
        };
        fetchFrequentPurchases();
    }, []);

    return (
        <Carousel>
            {frequentPurchases.map((cartProduct) => (
                <FrequentlyPurchasedItem
                    key={cartProduct.product.id}
                    cartProduct={cartProduct}
                />
            ))}
        </Carousel>
    );
};

export default FrequentlyPurchasedCarousel;
