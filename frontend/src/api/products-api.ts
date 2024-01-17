/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Pageable from '../domain/pageable';
import { Product } from '../domain/product';

export class Results {
    content: Product[] = [];

    pageable: Pageable = new Pageable();

    totalPages: number = 0;
}

// eslint-disable-next-line import/prefer-default-export
export const queryProducts = async (
    page: number,
    size: number,
    query: string,
    category: string
): Promise<Results> => {
    const params: any = {
        page,
        size,
    };

    if (query?.length > 0) params.q = query;
    if (category?.length > 0) params.c = category;

    const result = await axios.get<Results>(
        `http://localhost:8080/api/v1/products/query`,
        { params }
    );

    return result.data;
};
