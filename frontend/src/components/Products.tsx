import { useEffect, useState } from 'react';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import DiscountGallery from './discount/DiscountGallery';
import BuyAgainGallery from './buy-again/BuyAgainGallery';
import { useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
    const [results, setResults] = useState<Results>(new Results());
    const location = useLocation();
    const navigate = useNavigate();
    const pageSize = 8;

    // Listen for url updates
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await queryProducts(
                getPageNumber(),
                pageSize,
                getQuery() ?? '',
                getCategory() ?? ''
            );

            setResults(result);
        };

        fetchProducts();
    }, [location, location.search]);

    const setPage = (page: number) => {
        let search = new URLSearchParams(location.search);
        search.set('page', page.toString());
        navigate(`?${search}`);

        // Move window up
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const getCategory = () => new URLSearchParams(location.search).get('c');

    const getQuery = () => new URLSearchParams(location.search).get('q');

    const getPageNumber = () =>
        parseInt(new URLSearchParams(location.search).get('page') ?? '0');

    const getPageTitle = () => {
        if (getQuery())
            return `"${getQuery()!.toString().replace(/\+/g, ' ')}"`;
        if (getCategory())
            return `${getCategory()!.toString().replace(/\+/g, ' ')}`;
        return 'All Products';
    };

    return (
        <>
            {getPageNumber() === 0 && location.search.length == 0 && (
                <>
                    <BuyAgainGallery />
                    <DiscountGallery />
                </>
            )}

            <h2>{getPageTitle()}</h2>

            <ProductList
                products={results.content}
                currentPage={getPageNumber()}
                totalPages={results.totalPages}
                setPage={(page: number) => setPage(page)}
            />
        </>
    );
};

export default Products;
