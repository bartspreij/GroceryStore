import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import { Results, queryProducts } from '../api/products-api';
import ProductList from './ProductList';
import { Tag } from '../domain/tag';
import { fetchTags } from '../api/tag-api';
import { FaMinus } from 'react-icons/fa6';

interface ProductMockup {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: number;
    tagIds: number[];
}

const ManageProducts = () => {
    const [productMockup, setProductMockup] = useState<ProductMockup>({
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
        categoryId: -1,
        tagIds: [],
    });
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

    const setName = (name: string) => {
        setProductMockup((old) => ({
            ...old,
            name,
        }));
    };

    const setDescription = (description: string) => {
        setProductMockup((old) => ({
            ...old,
            description,
        }));
    };

    const setImageUrl = (imageUrl: string) => {
        setProductMockup((old) => ({
            ...old,
            imageUrl,
        }));
    };

    const setPrice = (price: string) => {
        setProductMockup((old) => ({
            ...old,
            price: parseInt(price),
        }));
    };

    const setTag = (index: number, tagName: string) => {
        const match = tags.find((t) => t.name === tagName);
        if (!match) return;

        tags[index] = match;
        setProductMockup((old) => ({
            ...old,
            tags,
        }));
    };

    const addTag = () => {
        const defaultTag = tags.find((t) => !t.category);
        if (!defaultTag) return;

        setProductMockup((old) => ({
            ...old,
            tagIds: [...old.tagIds, defaultTag.id],
        }));
    };

    const removeTag = (index: number) => {
        let tagIds = productMockup.tagIds;
        tagIds.splice(index, 1);

        setProductMockup((old) => ({
            ...old,
            tagIds,
        }));
    };

    const setCategory = (categoryId: string) => {
        setProductMockup((old) => ({
            ...old,
            categoryId: parseInt(categoryId),
        }));
    };

    const handleSubmitProduct = (e: any) => {
        e.preventDefault();
        console.log(productMockup);

        if (productMockup.name.length === 0) {
            alert('Name cannot be empty');
            return;
        }

        if (productMockup.price === 0) {
            alert('Price cannot be 0');
            return;
        }

        if (productMockup.categoryId < 0) {
            alert('Please choose a category');
            return;
        }
    };

    return (
        <>
            <div className="card bg-base-100 shadow-xl p-5 mb-5">
                <h2>Add product</h2>
                <form
                    className="flex flex-col gap-1"
                    onSubmit={handleSubmitProduct}
                >
                    <div className="flex gap-2 justify-stretch">
                        <label>
                            Name
                            <input
                                type="text"
                                value={productMockup.name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            Category
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option key={'no'} value={-1}>
                                    Choose...
                                </option>

                                {tags
                                    .filter((t) => t.category)
                                    .map((tag) => (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <label>
                            Price
                            <input
                                type="text"
                                value={productMockup.price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </label>
                    </div>

                    <label>
                        Image URL
                        <input
                            type="text"
                            className="w-full"
                            value={productMockup.imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        ></input>
                    </label>

                    <label>
                        Description
                        <input
                            type="text"
                            className="w-full"
                            value={productMockup.description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </label>

                    <div className="flex gap-2">
                        {productMockup.tagIds.length > 0 && (
                            <label>
                                Tags
                                <div className="flex flex-wrap gap-2">
                                    {productMockup.tagIds.map(
                                        (productTagId, index) => (
                                            <div
                                                className="inline-flex items-center"
                                                key={index}
                                            >
                                                <select
                                                    onChange={(e) =>
                                                        setTag(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {tags
                                                        .filter(
                                                            (t) => !t.category
                                                        )
                                                        .map((tag) => (
                                                            <option
                                                                key={tag.id}
                                                                value={tag.name}
                                                            >
                                                                {tag.name}
                                                            </option>
                                                        ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeTag(index)
                                                    }
                                                    className="ml-1 btn btn-xs btn-circle"
                                                >
                                                    <FaMinus />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </label>
                        )}

                        <button
                            type="button"
                            className="btn mt-auto"
                            onClick={addTag}
                        >
                            + Add tag
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success mt-2 m-auto"
                    >
                        Submit Product
                    </button>
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
