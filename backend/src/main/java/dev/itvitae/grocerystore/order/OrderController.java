package dev.itvitae.grocerystore.order;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/orders")
@RestController
public class OrderController {

    private final OrderRepository orderRepository;

    @GetMapping()
    public Iterable<OrderDTO> getCarts() {
        return orderRepository.findAll().stream().map(OrderDTO::new).toList();
    }

    @PostMapping()
    public ResponseEntity<Order> addCart(@RequestBody Order cart, UriComponentsBuilder ucb) {
        Order savedCart = orderRepository.save(cart);
        URI locationOfNewCart =
                ucb.path("api/v1/carts/{id}").buildAndExpand(savedCart.getId()).toUri();

        return ResponseEntity.created(locationOfNewCart).body(savedCart);
    }
}
