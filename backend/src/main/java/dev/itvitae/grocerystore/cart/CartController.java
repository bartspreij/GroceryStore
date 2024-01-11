package dev.itvitae.grocerystore.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("api/v1/carts")
@RestController
public class CartController {

    private final CartRepository cartRepository;

    @GetMapping()
    public Cart getCartById(@PathVariable Long id) {
        return cartRepository.findById(id).get();
    }

}
