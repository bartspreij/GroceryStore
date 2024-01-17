package dev.itvitae.grocerystore.userorder;

import dev.itvitae.grocerystore.order.Order;
import dev.itvitae.grocerystore.user.User;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class UserOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne private User user;

    @ManyToOne private Order order;
}
