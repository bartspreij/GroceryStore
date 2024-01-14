import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../domain/product';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
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
                                {product.tags.map((tag) => (
                                    <span
                                        className="p-1 bg-slate-400 text-white"
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>

                            <button type="button" className="btn btn-primary">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
