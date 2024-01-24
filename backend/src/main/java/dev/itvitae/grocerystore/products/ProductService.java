package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.order.OrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
}
