package dev.itvitae.grocerystore.seeder;

import dev.itvitae.grocerystore.cart.Cart;
import dev.itvitae.grocerystore.cart.CartService;
import dev.itvitae.grocerystore.cartproduct.CartProduct;
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

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final CartService cartService;
    private final ProductRepository productRepository;
    private final TagRepository tagRepository;

    @Override
    public void run(String... args) throws Exception {
        seedProducts();
        seedCart();
    }

    private void saveProduct(String name, String description, String imageUrl, BigDecimal price, Tag... tags) {
        Product product = new Product(name, description, imageUrl, price, tags);
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

        saveProduct("Apple", "empty", "https://i.imgur.com/TVN1Hs5.jpeg", BigDecimal.valueOf(0.89), fruit);
        saveProduct("Banana", "empty", "https://i.imgur.com/xhlyEjv.png", BigDecimal.valueOf(1.29), fruit, potassium);
        saveProduct("Minced Beef",
                "empty", "https://static.ah.nl/dam/product/AHI_4354523130303233323432?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(3.49), meat);
        saveProduct("Milk",
                "empty", "https://static.ah.nl/dam/product/AHI_43545239393331383832?revLabel=6&rendition=800x800_JPG_Q90&fileType=binary",
                BigDecimal.valueOf(1.89), dairy);
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
}