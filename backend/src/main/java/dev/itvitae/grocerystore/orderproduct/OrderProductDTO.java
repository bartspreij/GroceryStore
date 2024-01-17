package dev.itvitae.grocerystore.orderproduct;

import dev.itvitae.grocerystore.products.Product;

public record OrderProductDTO(Product product, Integer quantity) {
    public OrderProductDTO(OrderProduct cartProduct) {
        this(cartProduct.getProduct(), cartProduct.getQuantity());
    }
}
