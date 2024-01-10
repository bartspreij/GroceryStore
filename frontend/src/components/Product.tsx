import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grocery } from '../domain/grocery';

const Product = () => {
    const [products, setProducts] = useState<Grocery[]>([]);
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
        <div className="product">
            {products.map((product) => (
                <div key={product.id}>
                    <figure>
                        <img
                            src={product.imageLink}
                            alt={product.name}
                            height="300px"
                            width="300px"
                        />
                    </figure>
                    <div className="product-body">
                        <h2 className="product-title">{product.name}</h2>
                        <p>Category: {product.category}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
