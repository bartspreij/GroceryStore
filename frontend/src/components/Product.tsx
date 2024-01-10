import { useEffect, useState } from 'react';
import axios from 'axios';

const Product = () => {
    const [products, setProducts] = useState([]);
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
                <p>{product.name}</p>
            ))}
        </div>
    );
};

export default Product;
