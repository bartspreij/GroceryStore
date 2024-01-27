import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import DiscountGallery from './discount/DiscountGallery';
import BuyAgainGallery from './buy-again/BuyAgainGallery';
import { useLocation } from 'react-router-dom';

const Products = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());

    const location = useLocation();

    // Listen for route changes
    useEffect(() => {
        console.log('Route changed:');
        console.log(location);
        setPageable(new Pageable());
        fetchProduct();
    }, [location]);

    useEffect(() => {
        console.log('Pageable changed:');
        console.log(pageable);
        fetchProduct();
    }, [pageable.pageNumber, pageable.pageSize]);

    const fetchProduct = async () => {
        const searchType = window.location.search.substring(1, 2);
        let query = '';
        let category = '';
        if (searchType === 'c') category = getSearchQuery();
        if (searchType === 'q') query = getSearchQuery();

        const result = await queryProducts(
            pageable.pageNumber,
            pageable.pageSize,
            query,
            category
        );

        setResults(result);
        setPageable(result.pageable);
    };

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

    const getSearchQuery = () => location.search.substring(3);

    const getTitle = () => {
        if (location.search.length > 0) return `"${getSearchQuery()}"`;
        else return 'All Products';
    };

    return (
        <>
            {pageable.pageNumber === 0 && location.search.length == 0 && (
                <>
                    <BuyAgainGallery />
                    <DiscountGallery />
                </>
            )}

            <h2>{getTitle()}</h2>

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
