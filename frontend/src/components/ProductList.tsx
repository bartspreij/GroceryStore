import { Product } from '../domain/product';
import ProductCard from './common/ProductCard';

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    editProduct?: (product: Product) => void;
    deleteProduct?: (product: Product) => void;
    editDiscounts?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setPage,
    editProduct,
    deleteProduct,
    editDiscounts,
}) => {
    return (
        <>
            {products.length === 0 && (
                <div className="flex justify-center py-6">
                    <span className="text-slate-400">No products found</span>
                </div>
            )}

            <div className="products grid grid-cols-1 sm:grid-cols-4 gap-5">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        editProduct={editProduct}
                        deleteProduct={deleteProduct}
                        editDiscounts={editDiscounts}
                    />
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-8 mb-3">
                {[...Array(totalPages)].map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <button
                        className={`btn ${index === currentPage ? 'btn-success' : ''}`}
                        type="button"
                        // eslint-disable-next-line react/no-array-index-key
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

export default ProductList;
