import { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import Gallery from '../common/Gallery';
import { Results, queryProducts } from '../../api/products-api';

const DiscountGallery = () => {
    const [results, setResults] = useState<Results>(new Results());

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await queryProducts(0, 9999);

            setResults(result);
        };

        fetchProduct();
    }, []);

    return (
        <>
            <h2>On Sale</h2>
            <Gallery>
                {results.content
                    .filter((product) => product.discounts[0])
                    .map((product) => (
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
