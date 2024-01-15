import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grocery } from '../domain/grocery';
import Pageable from '../domain/pageable';

class Results {
    content: Grocery[] = [];

    pageable: Pageable = new Pageable();

    totalPages: number = 0;
}

const Product = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());

    useEffect(() => {
        const fetchProduct = async () => {
            const query = window.location.search.substring(3);
            const result = await axios.get(
                `http://localhost:8080/api/v1/products/query?q=${query}&page=${pageable.pageNumber}&size=${pageable.pageSize}`
            );

            setResults(result.data);
            setPageable(result.data.pageable);
            console.log(result.data);
        };

        fetchProduct();
    }, [pageable.pageNumber, pageable.pageSize]);

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    return (
        <>
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
                                    {product.tags.map((tag) => (
                                        <span
                                            className="p-1 bg-slate-400 text-white"
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Buy Now
                                </button>
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

export default Product;
