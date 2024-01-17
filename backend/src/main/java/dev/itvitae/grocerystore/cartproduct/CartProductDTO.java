package dev.itvitae.grocerystore.cartproduct;

import dev.itvitae.grocerystore.products.Product;

public record CartProductDTO(Product product, Integer quantity) {
    public CartProductDTO(CartProduct cartProduct) {
        this(cartProduct.getProduct(), cartProduct.getQuantity());
    }
}
