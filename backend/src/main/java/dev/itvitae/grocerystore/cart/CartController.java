package dev.itvitae.grocerystore.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RequestMapping("api/v1/carts")
@RestController
public class CartController {

    private final CartService cartService;

    @GetMapping()
    public Iterable<CartDTO> getCarts() {
        return cartService.getCartsAsCartDTO();
    }

    @PostMapping()
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart, UriComponentsBuilder ucb) {
        Cart savedCart = cartService.saveCart(cart);
        URI locationOfNewCart = ucb
                .path("api/v1/carts/{id}")
                .buildAndExpand(savedCart.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewCart).body(savedCart);
    }


}
