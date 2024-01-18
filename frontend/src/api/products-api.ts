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

// eslint-disable-next-line import/prefer-default-export
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

    const result = await axios.get<Results>(uri + `/query`, { params });

    return result.data;
};

export const postProduct = async (productMockup: Product) => {
    const result = await axios.post<Product>(uri, productMockup);

    return result.data;
};

export const saveProduct = async (productMockup: Product) => {
    const result = await axios.patch<Product>(uri, productMockup);

    return result.data;
};
