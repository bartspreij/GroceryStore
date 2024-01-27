import { Discount } from '../domain/discount';
import { Product } from '../domain/product';
import { api } from './api';

const uri = `discounts`;

export const postDiscount = async (discount: Discount, productId: number) => {
    const result = await api.post<Discount>(
        `${uri}/add-to-product/${productId}`,
        discount
    );
    return result.data;
};

export const deleteDiscount = async (discount: Discount) => {
    const result = await api.delete<Discount>(`${uri}/${discount.id}`);
    return result.data;
};

export const fetchDiscountProducts = async (): Promise<Product[]> => {
    const result = await api.get<Product[]>(uri);
    return result.data;
};
