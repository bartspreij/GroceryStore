package dev.itvitae.grocerystore.seeder;

import dev.itvitae.grocerystore.exception.UserNotFoundException;
import dev.itvitae.grocerystore.order.Order;
import dev.itvitae.grocerystore.order.OrderRepository;
import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.products.ProductRepository;
import dev.itvitae.grocerystore.products.ProductService;
import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import dev.itvitae.grocerystore.user.User;
import dev.itvitae.grocerystore.user.UserRepository;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedProducts();
        seedOrders();
    }

    private void seedUsers() {
        List<User> users =
                List.of(
                        new User("John Doe", "kaas", "bartspreij@gmail.com", "USER"),
                        new User("John Deere", "worst", "dummy@gmail.com", "ADMIN"));
        userRepository.saveAll(users);
    }

    private void saveProduct(String name, String imageUrl, BigDecimal price, Tag... tags) {
        Product product = new Product(name, imageUrl, price, tags);
        productRepository.save(product);
    }

    private Tag saveTag(String name, boolean isCategory) {
        Tag tag = new Tag(name, isCategory);
        tagRepository.save(tag);
        return tag;
    }

    private void seedProducts() {
        Tag fruit = saveTag("Fruit", true);
        Tag potassium = saveTag("Potassium", false);
        Tag meat = saveTag("Meat", true);
        Tag dairy = saveTag("Dairy", true);

        saveProduct("Apple", "https://i.imgur.com/TVN1Hs5.jpeg", BigDecimal.valueOf(0.89), fruit);
        saveProduct(
                "Banana",
                "https://i.imgur.com/xhlyEjv.png",
                BigDecimal.valueOf(1.29),
                fruit,
                potassium);
        saveProduct(
                "Minced Beef",
                "https://static.ah.nl/dam/product/AHI_4354523130303233323432?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(3.49),
                meat);
        saveProduct(
                "Milk",
                "https://static.ah.nl/dam/product/AHI_43545239393331383832?revLabel=6&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.89),
                dairy);
    }

    private void seedOrders() {
        List<Product> products = productRepository.findAll(PageRequest.of(0, 10)).toList();
        Order order = new Order();

        int maxQuantity = 10;
        for (Product product : products) {
            int randomQuantity = (int) (Math.random() * maxQuantity) + 1;
            order.getOrderProducts().add(new OrderProduct(order, product, randomQuantity));
        }

        // Hardcoded order products for testing frequency bought in that specific quantity
        List<OrderProduct> orderProducts =
                List.of(
                        new OrderProduct(order, products.get(1), 7),
                        new OrderProduct(order, products.get(1), 7),
                        new OrderProduct(order, products.get(1), 7));

        order.getOrderProducts().addAll(orderProducts);

        User user =
                userRepository
                        .findByEmail("bartspreij@gmail.com")
                        .orElseThrow(() -> new UserNotFoundException("bartspreij@gmail.com"));

        user.getOrders().add(order);
        order.setUser(user);
        orderRepository.save(order);

        productService.findTopTenMostFrequentlyPurchasedProductByUser(user);
    }
}
