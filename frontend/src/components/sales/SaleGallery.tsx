import { useEffect, useState } from 'react';
import axios from 'axios';
import SaleGalleryItem from './SaleGalleryItem';
import { Product } from '../../domain/product';

const SaleGallery = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchDiscount = async () => {
            const result = await axios.get<Product[]>(
                'http://localhost:8080/api/v1/discounts'
            );
            setProducts(result.data);
        };
        fetchDiscount();
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {products.length > 0 && (
                <>
                    <h2>On Sale</h2>
                    <div className="carousel w-full bg-neutral rounded-box mb-4">
                        {products.map((product) => (
                            <SaleGalleryItem
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default SaleGallery;
