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
                <div className="carousel carousel-center p-4 bg-neutral rounded-box">
                    {products.map((product) => (
                        <SaleGalleryItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    );
};

export default SaleGallery;
