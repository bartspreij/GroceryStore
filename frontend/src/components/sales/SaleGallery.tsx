import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SaleGalleryItem from './SaleGalleryItem';
import { Product } from '../../domain/product';

const SaleGallery = () => {
    const [productsOnSale, setProductsOnSale] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProductsOnSale = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/products/onsale'
            );
            setProductsOnSale(result.data);
        };
        fetchProductsOnSale();
    }, []);

    return (
        <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            {productsOnSale.map((product) => (
                <SaleGalleryItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default SaleGallery;
