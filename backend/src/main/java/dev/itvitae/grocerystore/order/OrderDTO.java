package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.orderproduct.OrderProductDTO;

import java.util.List;

public record OrderDTO(Long id, List<OrderProductDTO> products) {
    public OrderDTO(Order order) {
        this(order.getId(), order.getOrderProducts().stream().map(OrderProductDTO::new).toList());
    }
}
