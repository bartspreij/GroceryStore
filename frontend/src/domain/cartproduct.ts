import { Product } from './product';

export interface CartProduct extends Product {
    quantity: number;
}

export const sampleProducts: CartProduct[] = [
    {
        id: '1',
        name: 'Apples',
        category: 'Fruits',
        imageLink: 'https://example.com/apples.jpg',
        price: 1.2,
        quantity: 2,
    },
    {
        id: '2',
        name: 'Oranges',
        category: 'Fruits',
        imageLink: 'https://example.com/oranges.jpg',
        price: 0.8,
        quantity: 4,
    },
    {
        id: '3',
        name: 'Bananas',
        category: 'Fruits',
        imageLink: 'https://example.com/bananas.jpg',
        price: 1.5,
        quantity: 1,
    },
];
