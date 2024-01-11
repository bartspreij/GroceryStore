import { CartProduct } from './cartproduct';

export default interface Cart {
    id: number;
    cartProducts: CartProduct[];
}
