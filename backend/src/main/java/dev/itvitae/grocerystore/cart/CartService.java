package dev.itvitae.grocerystore.cart;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class CartService {

    private final CartRepository cartRepository;

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<CartDTO> getCartsAsCartDTO() {
        return cartRepository.findAll().stream().map(CartDTO::new).toList();
    }

}
