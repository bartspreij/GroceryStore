import axios from 'axios';
import { CartProduct } from '../domain/cart-product';

const fetchFrequentlyPurchasedInSpecificQuantity = async (): Promise<
    CartProduct[]
> => {
    const result = await axios.get<CartProduct[]>(
        'http://localhost:8080/api/v1/orders/user/1/frequently-purchased'
    );
    return result.data;
};

export default fetchFrequentlyPurchasedInSpecificQuantity;
