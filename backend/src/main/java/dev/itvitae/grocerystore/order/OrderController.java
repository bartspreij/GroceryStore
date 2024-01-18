package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.orderproduct.OrderProductDTO;
import dev.itvitae.grocerystore.orderproduct.OrderProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/orders")
@RestController
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;

    @GetMapping()
    public Iterable<OrderDTO> getOrders() {
        return orderRepository.findAll().stream().map(OrderDTO::new).toList();
    }

    @GetMapping("{userId}")
    public List<OrderProductDTO> getFrequentPurchaseByUser(@PathVariable Long userId) {
        return orderProductRepository.findTopFrequentlyPurchasedProducts(
                userId, PageRequest.of(0, 10));
    }

    @PostMapping()
    public ResponseEntity<Order> addCart(@RequestBody Order cart, UriComponentsBuilder ucb) {
        Order savedCart = orderRepository.save(cart);
        URI locationOfNewCart =
                ucb.path("api/v1/carts/{id}").buildAndExpand(savedCart.getId()).toUri();

        return ResponseEntity.created(locationOfNewCart).body(savedCart);
    }
}
