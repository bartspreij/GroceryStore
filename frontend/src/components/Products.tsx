import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import DiscountGallery from './discount/DiscountGallery';
import BuyAgainGallery from './buy-again/BuyAgainGallery';

const Products = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());
    const [filterUsed, setFilterUsed] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const searchType = window.location.search.substring(1, 2);
            let query = '';
            let category = '';
            if (searchType === 'c') {
                category = window.location.search.substring(3);
                setFilterUsed(true);
            }
            if (searchType === 'q') {
                query = window.location.search.substring(3);
                setFilterUsed(true);
            }

            const result = await queryProducts(
                pageable.pageNumber,
                pageable.pageSize,
                query,
                category
            );

            setResults(result);
            setPageable(result.pageable);
        };

        fetchProduct();
    }, [pageable.pageNumber, pageable.pageSize]);

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));

        // Move window up
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional: Use 'smooth' for smooth scrolling
        });
    };

    return (
        <>
            {pageable.pageNumber === 0 && filterUsed === false && (
                <>
                    <BuyAgainGallery />
                    <DiscountGallery products={results.content} />
                </>
            )}

            <ProductList
                products={results.content}
                currentPage={pageable.pageNumber}
                totalPages={results.totalPages}
                setPage={(page: number) => setPage(page)}
            />
        </>
    );
};

export default Products;
