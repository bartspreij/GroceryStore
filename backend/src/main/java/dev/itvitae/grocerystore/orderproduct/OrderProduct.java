package dev.itvitae.grocerystore.orderproduct;

import dev.itvitae.grocerystore.order.Order;
import dev.itvitae.grocerystore.products.Product;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    private Long id;

    @ManyToOne private Order order;

    @ManyToOne private Product product;

    private Integer quantity;

    public OrderProduct(Order order, Product product, Integer quantity) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderProduct that = (OrderProduct) o;

        if (!getProduct().equals(that.getProduct())) return false;
        return getQuantity().equals(that.getQuantity());
    }

    @Override
    public int hashCode() {
        int result = getProduct().hashCode();
        result = 31 * result + getQuantity().hashCode();
        return result;
    }
}
