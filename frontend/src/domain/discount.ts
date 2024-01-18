import { Product } from './product';

export interface Discount {
    id: number;
    discountedPrice: number;
    startDate: Date;
    endDate: Date;
    product: Product;
}
