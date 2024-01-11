package dev.itvitae.grocerystore.cartproduct;

public record CartProductDTO(Long id, Integer quantity) {
    public CartProductDTO(CartProduct cartProduct) {
        this(cartProduct.getProduct().getId(), cartProduct.getQuantity());
    }
}
