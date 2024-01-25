import axios from 'axios';
import { CartProduct } from '../domain/cart-product';
import Cart from '../domain/cart';

const uri = `http://localhost:8080/api/v1/orders`;

export const postOrder = async (order: Cart) => {
    const result = await axios.post<Cart>(uri, order);
    return result.data;
};

export const fetchFrequentlyPurchasedInSpecificQuantity = async (): Promise<
    CartProduct[]
> => {
    const result = await axios.get<CartProduct[]>(
        `${uri}/user/3/frequent-purchases`
    );
    return result.data;
};
