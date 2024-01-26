package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.exception.UserNotFoundException;
import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.orderproduct.OrderProductDTO;
import dev.itvitae.grocerystore.orderproduct.OrderProductRepository;
import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.products.ProductRepository;
import dev.itvitae.grocerystore.user.User;
import dev.itvitae.grocerystore.user.UserRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/orders")
@RestController
public class OrderController {

  private final OrderRepository orderRepository;
  private final OrderProductRepository orderProductRepository;
  private final ProductRepository productRepository;
  private final UserRepository userRepository;

  @GetMapping()
  public Iterable<OrderDTO> getOrders() {
    return orderRepository.findAll().stream().map(OrderDTO::new).toList();
  }

  @GetMapping("/user/{userId}/frequent-purchases")
  public List<OrderProductDTO> getFrequentPurchaseByUser(@PathVariable Long userId) {
    return orderProductRepository.findTopFrequentlyPurchasedProductsByUserId(
        userId, PageRequest.of(0, 10));
  }

  @PostMapping()
  public ResponseEntity<?> addCart(@RequestBody OrderDTO orderDTO, UriComponentsBuilder ucb) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();

    if (username.equals("anonymousUser")) {
      System.out.println("User not authenticated");
    } else {
      System.out.println(username + " retrieved");
    }

    // For now, get hard-coded user TODO: fix when auth supported
    User user =
        userRepository
            .findByUsername("user@gmail.com")
            .orElseThrow(() -> new UserNotFoundException("User not found"));

    // Create new order and assign user
    Order order = new Order();
    order.user = user;

    // Find products in our database matching the orderDTO.orderProducts
    for (OrderProductDTO orderProductDTO : orderDTO.orderProducts()) {
      Optional<Product> product = productRepository.findById(orderProductDTO.product().id());
      if (product.isEmpty()) return new ResponseEntity<>("", HttpStatus.NOT_FOUND);

      OrderProduct orderProduct =
          new OrderProduct(order, product.get(), orderProductDTO.quantity());
      order.orderProducts.add(orderProduct);
    }

    orderRepository.save(order);
    URI locationOfNewCart = ucb.path("api/v1/carts/{id}").buildAndExpand(order.getId()).toUri();

    return ResponseEntity.created(locationOfNewCart).body(new OrderDTO(order));
  }
}
