import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../domain/product';
import CartButtons from './cart/CartButtons';
import ShoppingCartContext from './cart/ShoppingCartContext';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { getCartProduct } = useContext(ShoppingCartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/v1/products/findall'
            );
            setProducts(result.data);
        };

        fetchProduct();
    }, []);

    return (
        <div className="products grid grid-cols-1 sm:grid-cols-3 gap-5">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="card text-gray-400 card-compact bg-base-100 shadow-xl"
                >
                    <figure className="aspect-square">
                        <img
                            className="w-full h-full object-cover"
                            src={product.imageUrl}
                            alt={product.name}
                            height="300px"
                            width="300px"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>

                        <p>€{product.price}</p>

                        <div className="card-actions justify-between">
                            <div className="flex flex-wrap items-center gap-1">
                                <span>Tags:</span>
                                {/* {product.productTags.map((tag) => (
                                    <span
                                        className="p-1 bg-slate-400 text-white"
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </span>
                                ))} */}
                            </div>

                            <br />
                            <CartButtons item={getCartProduct(product)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
