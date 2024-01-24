import { CartProduct } from './cart-product';

export default class Cart {
    public id: number = 0;
    public products: CartProduct[];

    constructor(products: CartProduct[] = []) {
        this.products = [...products];
    }
}
