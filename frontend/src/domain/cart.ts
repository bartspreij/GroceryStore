import { CartProduct } from './cart-product';

export default class Cart {
    public id: number = 0;

    public products: CartProduct[] = [];
}

export const dummyCart: Cart = {
    id: 1,
    products: [
        {
            id: 1,
            name: 'Apple',
            imageUrl: 'https://example.com/apples.jpg',
            price: 1.2,
            tags: [],
            quantity: 2,
        },
        {
            id: 2,
            name: 'Orange',
            imageUrl: 'https://example.com/oranges.jpg',
            price: 0.8,
            tags: [],
            quantity: 4,
        },
        {
            id: 3,
            name: 'Banana',
            imageUrl: 'https://example.com/bananas.jpg',
            price: 1.5,
            tags: [],
            quantity: 1,
        },
    ],
};
