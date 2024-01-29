package dev.itvitae.grocerystore.seeder;

import dev.itvitae.grocerystore.discounts.Discount;
import dev.itvitae.grocerystore.discounts.DiscountRepository;
import dev.itvitae.grocerystore.order.Order;
import dev.itvitae.grocerystore.order.OrderRepository;
import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.products.ProductRepository;
import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import dev.itvitae.grocerystore.user.User;
import dev.itvitae.grocerystore.user.UserRepository;
import dev.itvitae.grocerystore.user.UserService;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Transactional
@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;
  private final TagRepository tagRepository;
  private final DiscountRepository discountRepository;
  private final UserRepository userRepository;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    seedUsers();
    seedProducts();
    seedOrders();
    seedDiscounts();
  }

  private void seedUsers() {
    userRepository.saveAll(
        List.of(
            new User("John Doe", passwordEncoder.encode("worst"), "user@gmail.com", "USER"),
            new User("John Deere", passwordEncoder.encode("kaas"), "admin@gmail.com", "ADMIN")));
  }

  private void saveProduct(
      String name, String description, String imageUrl, BigDecimal price, Tag... tags) {
    Product product = new Product(name, description, imageUrl, price, tags);
    productRepository.save(product);
  }

  private Tag saveTag(String name) {
    Tag tag = new Tag(name, true);
    tagRepository.save(tag);
    return tag;
  }

  private Tag saveTag(String name, boolean isCategory) {
    Tag tag = new Tag(name, isCategory);
    tagRepository.save(tag);
    return tag;
  }

  private void seedProducts() {
    Tag meat = saveTag("Meat");
    Tag dairy = saveTag("Dairy");
    Tag seafood = saveTag("Seafood");
    Tag bread = saveTag("Bread");
    Tag fruits = saveTag("Fruits");
    Tag beverages = saveTag("Beverages");
    Tag pantry = saveTag("Pantry");
    Tag vegetables = saveTag("Vegetables");
    Tag protein = saveTag("Rich in protein", false);
    Tag carbs = saveTag("Lots of carbs", false);

    saveProduct(
        "Minced Beef",
        "High-quality minced beef for your favorite recipes.",
        "https://imgur.com/jFpJhgf.png",
        BigDecimal.valueOf(3.49),
        meat,
        protein);

    saveProduct(
        "Milk",
        "Fresh and nutritious milk for your daily needs.",
        "https://imgur.com/4P6rbXE.png",
        BigDecimal.valueOf(1.89),
        dairy,
        protein);

    saveProduct(
        "Chicken Breast",
        "Tender and lean chicken breasts for delicious meals.",
        "https://imgur.com/kswT8Vd.png",
        BigDecimal.valueOf(5.99),
        meat,
        protein);

    saveProduct(
        "Eggs",
        "Farm-fresh eggs for a protein-packed breakfast.",
        "https://imgur.com/twqG6lZ.png",
        BigDecimal.valueOf(2.49),
        pantry,
        protein);

    saveProduct(
        "Salmon Fillet",
        "Premium salmon fillet for a healthy and tasty dish.",
        "https://imgur.com/J6gqmuf.png",
        BigDecimal.valueOf(7.99),
        seafood,
        protein);

    saveProduct(
        "Bread",
        "Freshly baked bread for your daily sandwiches.",
        "https://imgur.com/iha1dYl.png",
        BigDecimal.valueOf(2.29),
        bread,
        carbs);

    saveProduct(
        "Apples",
        "Crisp and juicy apples for a healthy snack.",
        "https://imgur.com/ZlU2ptN.png",
        BigDecimal.valueOf(1.99),
        fruits);

    saveProduct(
        "Orange Juice",
        "Refreshing orange juice for a delightful drink.",
        "https://imgur.com/Gt7Gq8H.png",
        BigDecimal.valueOf(3.79),
        beverages);

    saveProduct(
        "Pasta",
        "Versatile pasta for quick and easy meal preparation.",
        "https://imgur.com/gpF2q24.png",
        BigDecimal.valueOf(1.49),
        pantry,
        carbs);

    saveProduct(
        "Yogurt",
        "Creamy yogurt for a delicious and healthy snack.",
        "https://imgur.com/ER5pinx.png",
        BigDecimal.valueOf(1.99),
        dairy,
        protein);

    saveProduct(
        "Spinach",
        "Fresh spinach for a nutritious addition to your meals.",
        "https://imgur.com/bBRiIB3.png",
        BigDecimal.valueOf(1.79),
        vegetables);

    saveProduct(
        "Ground Turkey",
        "Lean ground turkey for a lighter meat option.",
        "https://imgur.com/U6gx1Y8.png",
        BigDecimal.valueOf(4.29),
        meat,
        protein);

    saveProduct(
        "Cheese",
        "Variety of cheese for your culinary creations.",
        "https://imgur.com/zqvwzXM.png",
        BigDecimal.valueOf(3.99),
        dairy,
        protein);

    saveProduct(
        "Shrimp",
        "Delicious shrimp for seafood lovers.",
        "https://imgur.com/rBBeJOv.png",
        BigDecimal.valueOf(8.99),
        seafood);

    saveProduct(
        "Baguette",
        "Crusty baguette for a delightful accompaniment.",
        "https://imgur.com/Jvr0pwf.png",
        BigDecimal.valueOf(2.99),
        bread,
        carbs);

    saveProduct(
        "Bananas",
        "Sweet and nutritious bananas for a quick energy boost.",
        "https://imgur.com/2PxqzX2.png",
        BigDecimal.valueOf(0.69),
        fruits);

    saveProduct(
        "Iced Tea",
        "Refreshing iced tea for a cool beverage.",
        "https://imgur.com/9YzA29n.png",
        BigDecimal.valueOf(2.19),
        beverages);

    saveProduct(
        "Rice",
        "Versatile rice for a staple in your kitchen.",
        "https://imgur.com/brSEZp1.png",
        BigDecimal.valueOf(1.99),
        pantry,
        carbs);

    saveProduct(
        "Greek Yogurt",
        "Creamy Greek yogurt for a rich and indulgent treat.",
        "https://imgur.com/U7FGpH7.png",
        BigDecimal.valueOf(2.49),
        dairy,
        protein);

    saveProduct(
        "Broccoli",
        "Fresh broccoli for a nutritious and tasty side dish.",
        "https://imgur.com/fN2lZOY.png",
        BigDecimal.valueOf(1.49),
        vegetables);
  }

  private void seedOrders() {
    List<Product> products = productRepository.findAll(PageRequest.of(0, 10)).toList();
    User user = new User("Bob", "jaja", "bob@debouwer.nl", "USER");
    userService.saveUser(user);

    // Create multiple orders with varying quantities for the same products
    for (int i = 0; i < 5; i++) {
      Order order = new Order();
      order.setUser(user);

      int minQuantity = 2, maxQuantity = 6;
      for (Product product : products) {
        int randomQuantity = (int) (Math.random() * maxQuantity - minQuantity) + minQuantity;
        order.getOrderProducts().add(new OrderProduct(order, product, randomQuantity));
      }

      // Add some specific order products to test frequency in specific quantities
      if (i < 3) {
        order
            .getOrderProducts()
            .add(
                new OrderProduct(
                    order, products.get(i), i * 2 + 7)); // Make top three of 7, 9, 11 for testing
      }

      user.getOrders().add(order);
      orderRepository.save(order);
    }
  }

  private void seedDiscounts() {
    List<Product> allProducts = productRepository.findAll();
    if (allProducts.isEmpty()) return;
    Random random = new Random();

    for (var i = 0; i < 10; i++) {
      generateDiscount(allProducts.get(random.nextInt(allProducts.size())));
    }
  }

  private void generateDiscount(Product product) {
    Discount discount =
        new Discount(
            product.getPrice().multiply(BigDecimal.valueOf(0.8)),
            LocalDate.now(),
            LocalDate.now().plusDays(7),
            product);

    discountRepository.save(discount);
  }
}
