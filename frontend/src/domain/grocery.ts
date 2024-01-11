import { Tag } from './tag';

export interface Grocery {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    tags: Tag[];
}
