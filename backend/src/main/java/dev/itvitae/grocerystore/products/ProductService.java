package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.order.Order;
import dev.itvitae.grocerystore.order.OrderRepository;
import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.user.User;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public void findTopTenMostFrequentlyPurchasedProductByUser(User user) {
        Map<OrderProduct, Integer> orderProductsFrequencyMap = new HashMap<>();
        List<Order> orders = orderRepository.findAllByUser(user);

        for (Order order : orders) {
            for (OrderProduct orderProduct : order.getOrderProducts()) {
                System.out.printf(
                        "Name: %s\nQuantity: %d%n",
                        orderProduct.getProduct().getName(), orderProduct.getQuantity());
                incrementSpecificOrderProductCount(orderProduct, orderProductsFrequencyMap);
            }
        }

        for (Map.Entry<OrderProduct, Integer> entry : orderProductsFrequencyMap.entrySet()) {
            System.out.printf(
                    "Product: %s with the amount of %s\nPurchased %d times\n",
                    entry.getKey().getProduct().getName(),
                    entry.getKey().getQuantity(),
                    entry.getValue());
        }
    }

    private void incrementSpecificOrderProductCount(
            OrderProduct orderProduct, Map<OrderProduct, Integer> frequencyMap) {
        frequencyMap.putIfAbsent(orderProduct, 0);
        frequencyMap.merge(orderProduct, 1, Integer::sum);
    }
}
