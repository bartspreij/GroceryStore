import { useEffect, useState } from 'react';
import Pageable from '../domain/pageable';
import {
    Results,
    postProduct,
    queryProducts,
    saveProduct,
} from '../api/products-api';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import { Product } from '../domain/product';
import Popup from './Popup';

const ManageProducts = () => {
    const [results, setResults] = useState<Results>(new Results());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());
    const [productEditing, setProductEditing] = useState<Product>();
    const [addingProduct, setAddingProduct] = useState<boolean>(false);

    useEffect(() => {
        loadProducts();
    }, [pageable.pageNumber, pageable.pageSize]);

    const loadProducts = async () => {
        const result = await queryProducts(
            pageable.pageNumber,
            pageable.pageSize
        );

        setResults(result);
        setPageable(result.pageable);
    };

    const setPage = (page: number) => {
        setPageable((old) => ({
            ...old,
            pageNumber: page,
        }));
    };

    const handleSubmitProduct = async (productMockup: Product) => {
        try {
            await postProduct(productMockup);
            // window.location.href = '/admin';
        } catch {}
    };

    const handleSaveProduct = async (productMockup: Product) => {
        try {
            await saveProduct(productMockup);
            // window.location.href = '/admin';
        } catch {}
    };

    return (
        <>
            <button className="btn mb-4" onClick={() => setAddingProduct(true)}>
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
                {productEditing != undefined ? (
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

            <ProductList
                products={results.content}
                currentPage={pageable.pageNumber}
                totalPages={results.totalPages}
                setPage={(page: number) => setPage(page)}
                editProduct={(product: Product) => setProductEditing(product)}
            />
        </>
    );
};

export default ManageProducts;
