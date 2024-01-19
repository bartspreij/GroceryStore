import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import SaleGallery from './sales/SaleGallery';

const Products = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());

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

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    return (
        <>
            <SaleGallery />
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
