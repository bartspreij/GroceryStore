import React, { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa6';
import { Product } from '../domain/product';
import { Tag } from '../domain/tag';
import { fetchTags } from '../api/tag-api';

interface EditProductProps {
    title: string;
    submitLabel: string;
    product?: Product;
    onSubmit: (product: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({
    title,
    submitLabel,
    product,
    onSubmit,
}) => {
    // Save our passed Product into a local useState. If no Product passed, generate an empty one
    const [productMockup, setProductMockup] = useState<Product>({
        ...(product ?? {
            id: -1,
            name: '',
            description: '',
            imageUrl: '',
            price: 0,
            tags: [],
        }),
    });

    useEffect(() => {
        const loadTags = async () => {
            const tags = await fetchTags();
            setTags(tags);
        };

        loadTags();
    }, []);

    const [tags, setTags] = useState<Tag[]>([]);

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

    const addTag = () => {
        if (tags.length === 0) return;

        setProductMockup((old) => ({
            ...old,
            tags: [...old.tags, tags[0]],
        }));
    };

    const setTag = (index: number, tagIdString: string) => {
        const match = tags.find((t) => t.id === parseInt(tagIdString));
        if (!match) return;

        productMockup.tags[index] = match;
        setProductMockup((old) => ({
            ...old,
            tags: productMockup.tags,
        }));
    };

    const removeTag = (tagId: number) => {
        const index = productMockup.tags.findIndex((t) => t.id === tagId);
        if (index === -1) return;

        productMockup.tags.splice(index, 1);

        setProductMockup((old) => ({
            ...old,
            tags: productMockup.tags,
        }));
    };

    const handleSubmit = async (e: any) => {
        console.log(productMockup);

        e.preventDefault();

        if (productMockup.name.length === 0) {
            alert('Name cannot be empty');
            return;
        }

        if (productMockup.price === 0) {
            alert('Price cannot be 0');
            return;
        }

        if (productMockup.tags.length === 0) {
            alert('Product needs at least 1 tag');
            return;
        }

        onSubmit(productMockup);
    };

    return (
        <>
            <h2>{title}</h2>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={productMockup.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Price
                    <input
                        type="text"
                        value={productMockup.price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>

                <label>
                    Image URL
                    <input
                        type="text"
                        className="w-full"
                        value={productMockup.imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        className="w-full"
                        value={productMockup.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                {productMockup.tags.length > 0 && (
                    <label>
                        Tags
                        <div className="flex flex-col gap-2">
                            {productMockup.tags.map(
                                (productTag, productTagIndex) => (
                                    <div
                                        className="inline-flex items-center"
                                        key={productTagIndex}
                                    >
                                        <select
                                            value={productTag.id}
                                            onChange={(e) =>
                                                setTag(
                                                    productTagIndex,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {tags.map((tag, tagIndex) => (
                                                <option
                                                    key={tagIndex}
                                                    value={tag.id}
                                                >
                                                    {tag.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeTag(productTag.id)
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
                <button type="button" className="btn" onClick={addTag}>
                    + Add Tag
                </button>

                <button type="submit" className="btn btn-success mt-2 m-auto">
                    {submitLabel}
                </button>
            </form>
        </>
    );
};

export default EditProduct;
