import axios from 'axios';
import { Discount } from '../domain/discount';

const uri = `http://localhost:8080/api/v1/discounts`;

export const postDiscount = async (discount: Discount, productId: number) => {
    const result = await axios.post<Discount>(
        `${uri}/add-to-product/${productId}`,
        discount
    );
    return result.data;
};

export const deleteDiscount = async (discount: Discount) => {
    const result = await axios.delete<Discount>(`${uri}/${discount.id}`);
    return result.data;
};
