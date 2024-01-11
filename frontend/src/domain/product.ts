import { Tag } from './tag';

    id: number;
export interface Product {
    name: string;
    imageUrl: string;
    price: number;
    tags: Tag[];
}
