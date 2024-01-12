import { Product } from './product';

export interface CartProduct extends Product {
    quantity: number;
}

export const sampleProducts: CartProduct[] = [
    {
        id: 1,
        name: 'Apples',
        imageUrl: 'https://example.com/apples.jpg',
        price: 1.2,
        tags: [], // Assuming tags are an array of Tag objects
        quantity: 2,
    },
    {
        id: 2,
        name: 'Oranges',
        imageUrl: 'https://example.com/oranges.jpg',
        price: 0.8,
        tags: [],
        quantity: 4,
    },
    {
        id: 3,
        name: 'Bananas',
        imageUrl: 'https://example.com/bananas.jpg',
        price: 1.5,
        tags: [],
        quantity: 1,
    },
];
