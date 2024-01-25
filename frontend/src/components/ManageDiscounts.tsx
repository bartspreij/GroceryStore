/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { Product } from '../domain/product';
import { Discount } from '../domain/discount';

interface ManageDiscountsProps {
    product: Product;
    onSubmit: (discount: Discount, productId: number) => void;
    onDelete: (discount: Discount) => void;
}

const ManageDiscounts: React.FC<ManageDiscountsProps> = ({
    product,
    onSubmit,
    onDelete,
}) => {
    const [discountedPrice, setDiscountedPrice] = useState<string>(
        product.price.toString()
    );
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Check if valid
        const priceParsed = parseFloat(discountedPrice);
        if (Number.isNaN(priceParsed)) {
            alert('Please enter a valid price');
            return;
        }

        if (priceParsed >= product.price) {
            alert('Please enter a price lower then the original price');
            return;
        }

        if (!startDate || !endDate) {
            alert('Please select a valid start and end date');
            return;
        }

        const currentDate = new Date();
        const formattedCurrentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        console.log(currentDate);
        console.log(startDate);
        if (startDate < formattedCurrentDate) {
            alert('Please select future start date');
            return;
        }

        if (endDate < startDate) {
            alert('Please select an end date after the start date');
            return;
        }

        const discount: Discount = {
            id: -1,
            discountedPrice: priceParsed,
            startDate,
            endDate,
        };

        console.log(discount);

        onSubmit(discount, product.id);
    };

    return (
        <>
            <h3 className="mt-4">Discount list</h3>
            <div
                className="grid grid-cols-3 gap-1 max-h-32 overflow-y-auto mb-4"
                style={{ gridTemplateColumns: '0fr 1fr 0fr' }}
            >
                {product.discounts.map((d: Discount) => (
                    <div key={d.id} className="contents">
                        <span className="font-bold">
                            €{d.discountedPrice.toFixed(2)}
                        </span>
                        <span>
                            {d.startDate.toString()} until{' '}
                            {d.endDate.toString()}
                        </span>
                        <button
                            aria-label="Delete discount"
                            type="button"
                            className="btn btn-xs btn-circle btn-error"
                            onClick={() => onDelete(d)}
                        >
                            <FaTrashCan />
                        </button>
                    </div>
                ))}
            </div>

            <h3>Add new discount</h3>
            {product.discounts.length === 0 && <p>No discounts found</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label>
                    Price
                    <input
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                    />
                </label>
                <label>
                    Start date
                    <input
                        type="date"
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </label>
                <label>
                    End date
                    <input
                        type="date"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </label>
                <button type="submit" className="btn btn-success mt-2">
                    Submit discount
                </button>
            </form>
        </>
    );
};

export default ManageDiscounts;
