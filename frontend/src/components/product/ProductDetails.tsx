import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../domain/product';
import { getProductById } from '../../api/products-api';

const ProductDetails = () => {
    const [product, setProduct] = useState<Product>();
    const [notFound, setNotFound] = useState<boolean>(false);
    const location = useLocation();

    const { id } = useParams();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productId = parseInt(id!);
                const result = await getProductById(productId);
                setProduct(result);
            } catch {
                setNotFound(false);
            }
        };

        loadProduct();
    }, [location]);

    return (
        <>
            {notFound ? (
                <p>Not found</p>
            ) : (
                <>{!!product && <div>{product.id}</div>}</>
            )}
        </>
    );
};

export default ProductDetails;
