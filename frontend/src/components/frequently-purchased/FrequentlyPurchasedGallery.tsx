import { useContext, useEffect, useState } from 'react';
import Carousel from '../common/Gallery';
import { CartProduct } from '../../domain/cart-product';
import FrequentlyPurchasedItem from './FrequentlyPurchasedItem';
import { fetchFrequentlyPurchasedInSpecificQuantity } from '../../api/products-api';
import ShoppingCartContext from '../cart/ShoppingCartContext';

const FrequentlyPurchasedGallery = () => {
    const [frequentPurchases, setFrequentPurchases] = useState<CartProduct[]>(
        []
    );
    const { cart, isInCart } = useContext(ShoppingCartContext);

    useEffect(() => {
        const loadFrequentPurchases = async () => {
            const fetchedPurchases =
                await fetchFrequentlyPurchasedInSpecificQuantity();
            setFrequentPurchases(fetchedPurchases);
        };

        loadFrequentPurchases();
    }, []);

    useEffect(() => {
        const updatedFrequentPurchases = frequentPurchases.filter(
            (product) => !isInCart(product)
        );

        if (updatedFrequentPurchases.length !== frequentPurchases.length) {
            setFrequentPurchases(updatedFrequentPurchases);
        }
    }, [cart, frequentPurchases, isInCart]);

    return (
        <>
            <h2>Frequently Purchased</h2>
            <Carousel>
                {frequentPurchases.map((cartProduct) => (
                    <FrequentlyPurchasedItem
                        key={cartProduct.product.id}
                        cartProduct={cartProduct}
                    />
                ))}
            </Carousel>
        </>
    );
};

export default FrequentlyPurchasedGallery;
