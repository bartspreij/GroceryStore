import { Product } from '../domain/product';
import ProductCard from './common/ProductCard';

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setPage,
}) => {
    return (
        <>
            <div className="products grid grid-cols-1 sm:grid-cols-4 gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
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
