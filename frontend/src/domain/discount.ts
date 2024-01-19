import { Product } from './product';

export default interface Discount {
    startDate: Date;
    endDate: Date;
    discountPrice: number;
    product: Product;
}
