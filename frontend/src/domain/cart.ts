import { CartProduct } from './cart-product';

export default class Cart {
    public id: number = 0;
    public orderProducts: CartProduct[];

    constructor(products: CartProduct[] = []) {
        this.orderProducts = [...products];
    }
}
