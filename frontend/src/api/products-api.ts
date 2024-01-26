/* eslint-disable @typescript-eslint/no-explicit-any */
import Pageable from '../domain/pageable';
import { Product } from '../domain/product';
import { api } from './api';

const uri = `products`;

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

    const result = await api.get<Results>(`${uri}/query`, { params });
    return result.data;
};

export const postProduct = async (product: Product) => {
    const result = await api.post<Product>(uri, product);
    return result.data;
};

export const saveProduct = async (product: Product) => {
    const result = await api.patch<Product>(uri, product);
    return result.data;
};

export const deleteProduct = async (product: Product) => {
    const result = await api.delete<Product>(`${uri}/${product.id}`);
    return result.data;
};
