package dev.itvitae.grocerystore.seeder;

import dev.itvitae.grocerystore.cart.Cart;
import dev.itvitae.grocerystore.cart.CartService;
import dev.itvitae.grocerystore.cartproduct.CartProduct;
import dev.itvitae.grocerystore.discounts.Discount;
import dev.itvitae.grocerystore.discounts.DiscountRepository;
import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.products.ProductRepository;
import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final CartService cartService;
    private final ProductRepository productRepository;
    private final TagRepository tagRepository;
    private final DiscountRepository discountRepository;

    @Override
    public void run(String... args) throws Exception {
        seedProducts();
        seedCart();
        seedDiscounts();
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
                "https://static.ah.nl/dam/product/AHI_4354523130303233323432?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(3.49),
                meat,
                protein);

        saveProduct(
                "Milk",
                "Fresh and nutritious milk for your daily needs.",
                "https://static.ah.nl/dam/product/AHI_43545239393331383832?revLabel=6&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.89),
                dairy,
                protein);

        saveProduct(
                "Chicken Breast",
                "Tender and lean chicken breasts for delicious meals.",
                "https://static.ah.nl/dam/product/AHI_43545239383938333733?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(5.99),
                meat,
                protein);

        saveProduct(
                "Eggs",
                "Farm-fresh eggs for a protein-packed breakfast.",
                "https://static.ah.nl/dam/product/AHI_4354523130303133313939?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(2.49),
                pantry,
                protein);

        saveProduct(
                "Salmon Fillet",
                "Premium salmon fillet for a healthy and tasty dish.",
                "https://static.ah.nl/dam/product/AHI_43545239363933323830?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(7.99),
                seafood,
                protein);

        saveProduct(
                "Bread",
                "Freshly baked bread for your daily sandwiches.",
                "https://static.ah.nl/dam/product/AHI_4354523130303135363931?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(2.29),
                bread,
                carbs);

        saveProduct(
                "Apples",
                "Crisp and juicy apples for a healthy snack.",
                "https://static.ah.nl/dam/product/AHI_43545239383933333036?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.99),
                fruits);

        saveProduct(
                "Orange Juice",
                "Refreshing orange juice for a delightful drink.",
                "https://static.ah.nl/dam/product/AHI_43545239373536353838?revLabel=3&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(3.79),
                beverages);

        saveProduct(
                "Pasta",
                "Versatile pasta for quick and easy meal preparation.",
                "https://static.ah.nl/dam/product/AHI_43545239393232393430?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.49),
                pantry,
                carbs);

        saveProduct(
                "Yogurt",
                "Creamy yogurt for a delicious and healthy snack.",
                "https://static.ah.nl/dam/product/AHI_43545239393331373339?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.99),
                dairy,
                protein);

        saveProduct(
                "Spinach",
                "Fresh spinach for a nutritious addition to your meals.",
                "https://static.ah.nl/dam/product/AHI_43545239383736323931?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.79),
                vegetables);

        saveProduct(
                "Ground Turkey",
                "Lean ground turkey for a lighter meat option.",
                "https://static.ah.nl/dam/product/AHI_43545239393337383830?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(4.29),
                meat,
                protein);

        saveProduct(
                "Cheese",
                "Variety of cheese for your culinary creations.",
                "https://static.ah.nl/dam/product/AHI_4354523130303136373339?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(3.99),
                dairy,
                protein);

        saveProduct(
                "Shrimp",
                "Delicious shrimp for seafood lovers.",
                "https://static.ah.nl/dam/product/AHI_43545239393731363731?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(8.99),
                seafood);

        saveProduct(
                "Baguette",
                "Crusty baguette for a delightful accompaniment.",
                "https://static.ah.nl/dam/product/AHI_43545239383738313133?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(2.99),
                bread,
                carbs);

        saveProduct(
                "Bananas",
                "Sweet and nutritious bananas for a quick energy boost.",
                "https://static.ah.nl/dam/product/AHI_43545239383735353739?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(0.69),
                fruits);

        saveProduct(
                "Iced Tea",
                "Refreshing iced tea for a cool beverage.",
                "https://static.ah.nl/dam/product/AHI_4354523130303332363731?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(2.19),
                beverages);

        saveProduct(
                "Rice",
                "Versatile rice for a staple in your kitchen.",
                "https://static.ah.nl/dam/product/AHI_43545239393033323534?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.99),
                pantry,
                carbs);

        saveProduct(
                "Greek Yogurt",
                "Creamy Greek yogurt for a rich and indulgent treat.",
                "https://static.ah.nl/dam/product/AHI_43545239393032303236?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(2.49),
                dairy,
                protein);

        saveProduct(
                "Broccoli",
                "Fresh broccoli for a nutritious and tasty side dish.",
                "https://static.ah.nl/dam/product/AHI_43545237303333353032?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.49),
                vegetables);
    }

    private void seedCart() {
        Page<Product> products = productRepository.findAll(PageRequest.of(0, 10));
        Cart cart = new Cart();

        int maxQuantity = 10;
        for (Product product : products) {
            int randomQuantity = (int) (Math.random() * maxQuantity);
            cart.getCartProducts().add(new CartProduct(cart, product, randomQuantity));
        }

        cartService.saveCart(cart);
    }

    private void seedDiscounts() {
        List<Product> allProducts = productRepository.findAll();
        if(allProducts.isEmpty()) return;
        Random random = new Random();

        discountRepository.saveAll(
                List.of(new Discount(1.0, LocalDate.now(), LocalDate.now().plusDays(7),
                                allProducts.get(random.nextInt(allProducts.size()))),
                        new Discount(2.49, LocalDate.now(), LocalDate.now().plusDays(7),
                                allProducts.get(random.nextInt(allProducts.size()))),
                        new Discount(2.49, LocalDate.now(), LocalDate.now().plusDays(7),
                                allProducts.get(random.nextInt(allProducts.size()))),
                        new Discount(2.49, LocalDate.now(), LocalDate.now().plusDays(7),
                                allProducts.get(random.nextInt(allProducts.size())))
                ));
    }
}
