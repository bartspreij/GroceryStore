import { Tag } from './tag';

export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    tags: Tag[];
}
