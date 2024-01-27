import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Product } from '../../domain/product';
import { getProductById } from '../../api/products-api';
import CartButtons from '../cart/CartButtons';
import { useShoppingCart } from '../cart/ShoppingCartContext';
import Tags from '../common/Tags';

const ProductDetails = () => {
    const [product, setProduct] = useState<Product>();
    const [notFound, setNotFound] = useState<boolean>(false);
    const location = useLocation();

    const { id } = useParams();
    const { getCartProduct } = useShoppingCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productId = parseInt(id!);
                const result = await getProductById(productId);
                setProduct(result.data);
            } catch (err: any) {
                console.error(err);
                setNotFound(true);
            }
        };

        loadProduct();
    }, [location]);

    return (
        <>
            {notFound ? (
                <p className="text-lg text-center text-slate-400 mt-10">
                    Product not found
                </p>
            ) : (
                <>
                    {!!product && (
                        <div>
                            <h1>{product.name}</h1>

                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 text-gray-400">
                                <div>
                                    <figure className="max-h-96 aspect-square">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={product.imageUrl}
                                            alt={product.name}
                                            height="300px"
                                            width="300px"
                                        />
                                    </figure>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p>{product.description}</p>
                                    <Tags tags={product.tags} />
                                    <div>
                                        {product.discounts[0] ? (
                                            <>
                                                <span>
                                                    €
                                                    {product.discounts[0].discountedPrice.toFixed(
                                                        2
                                                    )}
                                                </span>
                                                <span className="line-through text-slate-300 ml-2">
                                                    €{product.price.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span>
                                                €{product.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-end w-full pb-2 pr-2">
                                        <CartButtons
                                            item={getCartProduct(product)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetails;
