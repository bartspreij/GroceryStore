import { useContext } from 'react';
import CartButtons from './cart/CartButtons';
import ShoppingCartContext from './cart/ShoppingCartContext';
import { Tag } from '../domain/tag';
import { Product } from '../domain/product';
import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    editProduct?: (product: Product) => void;
    deleteProduct?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setPage,
    editProduct,
    deleteProduct,
}) => {
    const { getCartProduct } = useContext(ShoppingCartContext);

    return (
        <>
            <div className="products grid grid-cols-1 sm:grid-cols-3 gap-5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card text-gray-400 card-compact bg-base-100 shadow-xl"
                    >
                        <figure className="aspect-square">
                            <img
                                className="w-full h-full object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                                height="300px"
                                width="300px"
                            />
                        </figure>

                        {!!editProduct && (
                            <button
                                className="btn btn-sm btn-circle absolute top-1 left-1"
                                onClick={() => editProduct(product)}
                            >
                                <MdEdit />
                            </button>
                        )}

                        {!!deleteProduct && (
                            <button
                                className="btn btn-sm btn-circle btn-error absolute top-1 right-1"
                                onClick={() => deleteProduct(product)}
                            >
                                <FaTrashCan />
                            </button>
                        )}

                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>

                            <p>€{product.price}</p>

                            <div className="card-actions justify-between">
                                <div className="flex flex-wrap items-center gap-1">
                                    <span>Tags:</span>
                                    {product.tags.map((tag: Tag) => (
                                        <a
                                            className="p-1 bg-slate-400 text-white"
                                            href={'/?c=' + tag.name}
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