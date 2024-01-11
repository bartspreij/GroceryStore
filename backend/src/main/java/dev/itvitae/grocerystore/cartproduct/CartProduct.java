package dev.itvitae.grocerystore.cartproduct;

import dev.itvitae.grocerystore.cart.Cart;
import dev.itvitae.grocerystore.products.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;

@Entity
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Product product;

    private Integer quantity;


}
