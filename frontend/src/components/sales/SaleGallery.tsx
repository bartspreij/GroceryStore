import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SaleGalleryItem from './SaleGalleryItem';
import { Discount } from '../../domain/discount';

const SaleGallery = () => {
    const [productsOnSale, setProductsOnSale] = useState<Discount[]>([]);

    useEffect(() => {
        const fetchProductsOnSale = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/discounts'
            );
            setProductsOnSale(result.data);
        };
        fetchProductsOnSale();
    }, []);

    return (
        <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            {productsOnSale.map((discount) => (
                <SaleGalleryItem key={discount.id} discount={discount} />
            ))}
        </div>
    );
};

export default SaleGallery;
