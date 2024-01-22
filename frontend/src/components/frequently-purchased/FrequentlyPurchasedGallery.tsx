import { useContext, useEffect, useState } from 'react';
import { CartProduct } from '../../domain/cart-product';
import { fetchFrequentlyPurchasedInSpecificQuantity } from '../../api/products-api';
import ShoppingCartContext from '../cart/ShoppingCartContext';
import GalleryProductCard from '../common/GalleryProductCard';
import Gallery from '../common/Gallery';

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
            console.log(fetchedPurchases);
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
            <Gallery>
                {frequentPurchases.map((cartProduct) => (
                    <GalleryProductCard
                        key={cartProduct.product.id}
                        product={cartProduct.product}
                        quantity={cartProduct.quantity}
                    />
                ))}
            </Gallery>
        </>
    );
};

export default FrequentlyPurchasedGallery;
