import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductProps {
    id: string;
    name: string;
    category: string;
    imageLink: string;
    price: number;
}

const Product = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/products/findall'
            );
            setProducts(result.data);
            console.log(result.data);
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <img
                        height="300px"
                        width="300px"
                        src={product.imageLink}
                        alt={product.name}
                    />
                    <p>{product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Product;
