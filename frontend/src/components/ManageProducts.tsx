import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import { Tag } from '../domain/tag';
import { fetchCategories, fetchTags } from '../api/tag-api';

const ManageProducts = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [tags, setTags] = useState<Tag[]>([]);
    const [pageable, setPageable] = useState<Pageable>(new Pageable());

    useEffect(() => {
        const loadTags = async () => {
            const tags = await fetchTags();
            setTags(tags);
        };

        const loadProducts = async () => {
            const result = await queryProducts(
                pageable.pageNumber,
                pageable.pageSize
            );

            setResults(result);
            setPageable(result.pageable);
        };

        loadProducts();
        loadTags();
    }, [pageable.pageNumber, pageable.pageSize]);

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    return (
        <>
            <div>
                <form>
                    <label>
                        Name
                        <input type="text"></input>
                    </label>
                    <label>
                        Description
                        <input type="text"></input>
                    </label>
                    <label>
                        Price
                        <input type="text"></input>
                    </label>
                    <label>
                        Tags
                        <select>
                            <option></option>
                        </select>
                    </label>
                </form>
            </div>

            <ProductList
                products={results.content}
                currentPage={pageable.pageNumber}
                totalPages={results.totalPages}
                setPage={(page: number) => setPage(page)}
            />
        </>
    );
};

export default ManageProducts;
