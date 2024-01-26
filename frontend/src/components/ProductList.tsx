import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { Tag } from '../domain/tag';
import { Product } from '../domain/product';
import { Discount } from '../domain/discount';
import CartButtons from './cart/CartButtons';
import { useShoppingCart } from './cart/ShoppingCartContext';

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
    const { getCartProduct } = useShoppingCart();

    return (
        <>
            <div className="products grid grid-cols-1 sm:grid-cols-4 gap-5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card text-gray-400 card-compact bg-base-100 shadow-xl"
                    >
                        <figure
                            style={{
                                aspectRatio: '1.3',
                            }}
                        >
                            <img
                                className="w-full h-full object-contain p-2"
                                src={product.imageUrl}
                                alt={product.name}
                                height="300px"
                                width="300px"
                            />
                        </figure>

                        {!!editProduct && (
                            <button
                                aria-label="Edit button"
                                type="button"
                                className="btn btn-sm btn-circle absolute top-1 left-1"
                                onClick={() => editProduct(product)}
                            >
                                <MdEdit />
                            </button>
                        )}

                        {!!deleteProduct && (
                            <button
                                aria-label="Delete button"
                                type="button"
                                className="btn btn-sm btn-circle btn-error absolute top-1 right-1"
                                onClick={() => deleteProduct(product)}
                            >
                                <FaTrashCan />
                            </button>
                        )}

                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h3>{product.name}</h3>
                                {product.discounts[0] ? (
                                    <>
                                        <span className="line-through">
                                            €{product.price}
                                        </span>
                                        <span>
                                            €
                                            {
                                                product.discounts[0]
                                                    .discountedPrice
                                            }
                                        </span>
                                    </>
                                ) : (
                                    <span>€{product.price}</span>
                                )}
                                            {!!editDiscounts && (
                                        <button
                                            type="button"
                                            title="Edit discounts"
                                            className="btn btn-xs btn-circle ml-1"
                                            onClick={() =>
                                                editDiscounts(product)
                                            }
                                        >
                                            %
                                        </button>
                                    )}

                            </div>
                            <div className="card-actions justify-between">
                                <div className="flex flex-wrap items-center gap-1">
                                    <span>Tags:</span>
                                    {product.tags.map((tag: Tag) => (
                                        <a
                                            className="p-1 bg-slate-400 text-white"
                                            href={`/?c=${tag.name}`}
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </a>
                                    ))}
                                </div>

                                <CartButtons item={getCartProduct(product)} />
                            </div>
                        </div>
                    </div>
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
