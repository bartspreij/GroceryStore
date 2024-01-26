/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Pageable from '../domain/pageable';
import { Product } from '../domain/product';

const uri = `http://localhost:8080/api/v1/products`;

export class Results {
    content: Product[] = [];

    pageable: Pageable = new Pageable();

    totalPages: number = 0;
}

export const queryProducts = async (
    page: number,
    size: number,
    query?: string,
    category?: string
): Promise<Results> => {
    const params: any = {
        page,
        size,
    };

    if (query && query.length > 0) params.q = query;
    if (category && category.length > 0) params.c = category;

    const result = await axios.get<Results>(`${uri}/query`, { params });
    return result.data;
};

export const postProduct = async (product: Product) => {
    const result = await axios.post<Product>(uri, product);
    return result.data;
};

export const saveProduct = async (product: Product) => {
    const result = await axios.patch<Product>(uri, product);
    return result.data;
};

export const deleteProduct = async (product: Product) => {
    const result = await axios.delete<Product>(`${uri}/${product.id}`);
    return result.data;
};

export const fetchDiscountProducts = async (): Promise<Product[]> => {
    const result = await axios.get<Product[]>(
        'http://localhost:8080/api/v1/discounts'
    );
    return result.data;
};

export const fetchBuyAgainProducts = async (): Promise<CartProduct[]> => {
    const result = await axios.get<CartProduct[]>(
        'http://localhost:8080/api/v1/orders/user/3/frequent-purchases'
    );
    return result.data;
};
