/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import {
    Results,
    deleteProduct,
    postProduct,
    queryProducts,
    saveProduct,
} from '../api/products-api';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import { Product } from '../domain/product';
import Popup from './Popup';
import ManageDiscounts from './ManageDiscounts';
import { Discount } from '../domain/discount';
import { deleteDiscount, postDiscount } from '../api/discount-api';

const ManageProducts = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());
    const [productEditing, setProductEditing] = useState<Product>();
    const [addingProduct, setAddingProduct] = useState<boolean>(false);
    const [discountEditing, setDiscountEditing] = useState<Product>();

    const loadProducts = async () => {
        const result = await queryProducts(
            pageable.pageNumber,
            pageable.pageSize
        );

        setResults(result);
        setPageable(result.pageable);
    };

    useEffect(() => {
        loadProducts();
    }, [pageable.pageNumber, pageable.pageSize]);

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    const handleSubmitProduct = async (productMockup: Product) => {
        await postProduct(productMockup);
        setAddingProduct(false);
        loadProducts();
    };

    const handleSaveProduct = async (productMockup: Product) => {
        await saveProduct(productMockup);
        setProductEditing(undefined);
        loadProducts();
    };

    const handleDeleteProduct = async (product: Product) => {
        if (!confirm(`Are you sure you want to delete ${product.name}?`))
            return;

        await deleteProduct(product);
        loadProducts();
    };

    const handleSubmitDiscount = async (
        discount: Discount,
        productId: number
    ) => {
        await postDiscount(discount, productId);
        setDiscountEditing(undefined);
        loadProducts();
    };

    const handleDeleteDiscount = async (discount: Discount) => {
        await deleteDiscount(discount);
        setDiscountEditing(undefined);
        loadProducts();
    };

    return (
        <>
            <button
                type="button"
                className="m-auto btn btn-success mb-4"
                onClick={() => setAddingProduct(true)}
            >
                Add new product
            </button>

            {/* Add new product */}
            <Popup
                isOpen={addingProduct}
                onClose={() => setAddingProduct(false)}
            >
                <EditProduct
                    title="Add new product"
                    submitLabel="Submit product"
                    onSubmit={(productMockup: Product) =>
                        handleSubmitProduct(productMockup)
                    }
                />
            </Popup>

            {/* Edit existing product */}
            <Popup
                isOpen={!!productEditing}
                onClose={() => setProductEditing(undefined)}
            >
                {productEditing ? (
                    <EditProduct
                        title="Edit product"
                        submitLabel="Save changes"
                        product={productEditing!}
                        onSubmit={(productMockup: Product) =>
                            handleSaveProduct(productMockup)
                        }
                    />
                ) : null}
            </Popup>

            {/* Edit discounts */}
            <Popup
                isOpen={!!discountEditing}
                onClose={() => setDiscountEditing(undefined)}
            >
                {discountEditing && (
                    <ManageDiscounts
                        product={discountEditing}
                        onSubmit={handleSubmitDiscount}
                        onDelete={handleDeleteDiscount}
                    />
                )}
            </Popup>

            <ProductList
                products={results.content}
                currentPage={pageable.pageNumber}
                totalPages={results.totalPages}
                setPage={(page: number) => setPage(page)}
                editProduct={(product: Product) => setProductEditing(product)}
                deleteProduct={(product: Product) =>
                    handleDeleteProduct(product)
                }
                editDiscounts={(product: Product) =>
                    setDiscountEditing(product)
                }
            />
        </>
    );
};

export default ManageProducts;
