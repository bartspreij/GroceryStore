package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.user.User;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "`order`")
public class Order {

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    Set<OrderProduct> orderProducts = new HashSet<>();

    @ManyToOne() User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
