import { useContext, useEffect, useState } from 'react';
import CartButtons from './cart/CartButtons';
import ShoppingCartContext from './cart/ShoppingCartContext';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import { Tag } from '../domain/tag';
import { Product } from '../domain/product';

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setPage,
}) => {
    const { getCartProduct } = useContext(ShoppingCartContext);

    return (
        <>
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
                                    {product.tags.map((tag: Tag) => (
                                        <a
                                            className="p-1 bg-slate-400 text-white"
                                            href={'/?c=' + tag.name}
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </a>
                                    ))}
                                </div>

                                <CartButtons item={getCartProduct(product)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <button
                        className={`btn ${index === currentPage ? 'btn-success' : ''}`}
                        type="button"
                        key={index + 1}
                        onClick={() => setPage(index)}
                    >
                        {index + 1}
                    </button>
                ))}{' '}
            </div>
        </>
    );
};

export default ProductList;
