package dev.itvitae.grocerystore.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/v1/carts")
@RestController
public class CartController {

    private final CartRepository cartRepository;

    @PostMapping(@RequestBody Cart cart)
    public Cart getCartById(@PathVariable Long id) {
        return cartRepository.findById(id).get();
    }

}
