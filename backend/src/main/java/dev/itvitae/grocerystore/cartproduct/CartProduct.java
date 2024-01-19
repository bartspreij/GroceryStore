package dev.itvitae.grocerystore.cartproduct;

import dev.itvitae.grocerystore.cart.Cart;
import dev.itvitae.grocerystore.products.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    private Integer quantity;

    public CartProduct(Cart cart, Product product, Integer quantity) {
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
    }
}
