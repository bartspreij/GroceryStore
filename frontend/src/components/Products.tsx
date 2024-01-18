import { useContext, useEffect, useState } from 'react';
import CartButtons from './cart/CartButtons';
import ShoppingCartContext from './cart/ShoppingCartContext';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import { Tag } from '../domain/tag';
import SaleGallery from './sales/SaleGallery';
import fetchFrequentlyPurchasedInSpecificQuantity from '../api/frequently-purchased-api';
import { CartProduct } from '../domain/cart-product';
import Carousel from './frequently-purchased/Carousel';

const Products = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());
    const [frequentPurchases, setFrequentPurchases] = useState<CartProduct[]>(
        []
    );
    const { getCartProduct } = useContext(ShoppingCartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            const searchType = window.location.search.substring(1, 2);
            let query = '';
            let category = '';
            if (searchType === 'c')
                category = window.location.search.substring(3);
            if (searchType === 'q') query = window.location.search.substring(3);

            const result = await queryProducts(
                pageable.pageNumber,
                pageable.pageSize,
                query,
                category
            );

            setResults(result);
            setPageable(result.pageable);
            console.log(result);
        };

        fetchProduct();
    }, [pageable.pageNumber, pageable.pageSize]);

    useEffect(() => {
        const fetchFrequentPurchases = async () => {
            const orderProducts =
                await fetchFrequentlyPurchasedInSpecificQuantity();
            setFrequentPurchases(orderProducts);
        };

        fetchFrequentPurchases();
    }, [setFrequentPurchases]);

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    return (
        <>
            <Carousel cartProducts={frequentPurchases} />
            <SaleGallery />
            <div className="products grid grid-cols-1 sm:grid-cols-3 gap-5">
                {results.content.map((product) => (
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
                                            href={`/?c=${tag.name}`}
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
                {[...Array(results.totalPages)].map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <button
                        className="btn"
                        type="button"
                        // eslint-disable-next-line react/no-array-index-key
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

export default Products;
