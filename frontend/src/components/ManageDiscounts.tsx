import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { Product } from '../domain/product';

interface ManageDiscountsProps {
    product: Product;
}

const ManageDiscounts: React.FC<ManageDiscountsProps> = ({ product }) => {
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discountProduct, setDiscountProduct] = useState<Product>(product);

    return ()
};
