package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.user.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser(User user);
}
