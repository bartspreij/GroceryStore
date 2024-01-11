package dev.itvitae.grocerystore.cart;

import dev.itvitae.grocerystore.cartproduct.CartProductDTO;

import java.util.List;

public record CartDTO(Long id, List<CartProductDTO> cartProducts) {
    public CartDTO(Cart cart) {
        this(cart.getId(), cart.getCartProducts().stream()
                .map(CartProductDTO::new)
                .toList());
    }
}
