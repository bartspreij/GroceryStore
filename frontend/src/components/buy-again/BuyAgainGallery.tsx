import { useEffect, useMemo, useState } from 'react';
import { CartProduct } from '../../domain/cart-product';
import Gallery from '../common/Gallery';
import { useShoppingCart } from '../cart/ShoppingCartContext';
import ProductCard from '../common/ProductCard';
import { fetchBuyAgainProducts } from '../../api/order-api';

const BuyAgainGallery = () => {
    const [frequentPurchases, setFrequentPurchases] = useState<CartProduct[]>(
        []
    );
    const { isInCart } = useShoppingCart();

    useEffect(() => {
        const loadFrequentPurchases = async () => {
            const fetchedPurchases = await fetchBuyAgainProducts();
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
                    <div
                        className="carousel-item max-w-xs max-h-96"
                        key={cartProduct.product.id}
                        style={{ maxWidth: '25%' }}
                    >
                        <ProductCard
                            product={cartProduct.product}
                            quantity={cartProduct.quantity}
                        />
                    </div>
                ))}
            </Gallery>
        </>
    );
};

export default BuyAgainGallery;
