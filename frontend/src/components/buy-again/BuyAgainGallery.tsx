import { useContext, useEffect, useMemo, useState } from 'react';
import { CartProduct } from '../../domain/cart-product';
import { fetchFrequentlyPurchasedInSpecificQuantity } from '../../api/products-api';
import GalleryProductCard from '../common/GalleryProductCard';
import Gallery from '../common/Gallery';
import ShoppingCartContext from '../cart/ShoppingCartContext';

const FrequentlyPurchasedGallery = () => {
    const [frequentPurchases, setFrequentPurchases] = useState<CartProduct[]>(
        []
    );
    const { isInCart } = useContext(ShoppingCartContext);

    useEffect(() => {
        const loadFrequentPurchases = async () => {
            const fetchedPurchases =
                await fetchFrequentlyPurchasedInSpecificQuantity();
            setFrequentPurchases(fetchedPurchases);
        };

        loadFrequentPurchases();
    }, []);

    const filteredFrequentPurchases = useMemo(() => {
        return frequentPurchases.filter((product) => !isInCart(product));
    }, [frequentPurchases, isInCart]);

    return (
        <>
            {filteredFrequentPurchases.length !== 0 && <h2>Buy again</h2>}
            <Gallery>
                {filteredFrequentPurchases.map((cartProduct) => (
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
