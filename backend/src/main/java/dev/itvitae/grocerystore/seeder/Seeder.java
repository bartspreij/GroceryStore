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

    private void saveProduct(String name, String imageUrl, BigDecimal price, boolean onSale, Tag...tags){
        Product product = new Product(name, imageUrl, price, onSale, tags);
        productRepository.save(product);
    }

    private Tag saveTag(String name) {
        Tag tag = new Tag(name);
        tagRepository.save(tag);
        return tag;
    }

    private void seedProducts() {
        Tag meat = saveTag("Meat");
        Tag dairy = saveTag("Dairy");
        Tag seafood = saveTag("Seafood");
        Tag bakery = saveTag("Bakery");
        Tag fruits = saveTag("Fruits");
        Tag beverages = saveTag("Beverages");
        Tag pantry = saveTag("Pantry");
        Tag vegetables = saveTag("Vegetables");

        saveProduct("Minced Beef", "https://static.ah.nl/dam/product/AHI_4354523130303233323432?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(3.49), true, meat);
        saveProduct("Milk", "https://static.ah.nl/dam/product/AHI_43545239393331383832?revLabel=6&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.89), true, dairy);
        saveProduct("Chicken Breast", "https://static.ah.nl/dam/product/AHI_43545239383938333733?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(5.99), true, meat);
        saveProduct("Eggs", "https://static.ah.nl/dam/product/AHI_4354523130303133313939?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(2.49), true, pantry);
        saveProduct("Salmon Fillet", "https://static.ah.nl/dam/product/AHI_43545239363933323830?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(7.99), true, seafood);
        saveProduct("Bread", "https://static.ah.nl/dam/product/AHI_4354523130303135363931?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(2.29), true, bakery);
        saveProduct("Apples", "https://static.ah.nl/dam/product/AHI_43545239383933333036?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.99), true, fruits);
        saveProduct("Orange Juice", "https://static.ah.nl/dam/product/AHI_43545239373536353838?revLabel=3&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(3.79), true, beverages);
        saveProduct("Pasta", "https://static.ah.nl/dam/product/AHI_43545239393232393430?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.49), false, pantry);
        saveProduct("Yogurt", "https://static.ah.nl/dam/product/AHI_43545239393331373339?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.99), false, dairy);
        saveProduct("Spinach", "https://static.ah.nl/dam/product/AHI_43545239383736323931?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.79), false, vegetables);
        saveProduct("Ground Turkey", "https://static.ah.nl/dam/product/AHI_43545239393337383830?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(4.29), false, meat);
        saveProduct("Cheese", "https://static.ah.nl/dam/product/AHI_4354523130303136373339?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(3.99), false, dairy);
        saveProduct("Shrimp", "https://static.ah.nl/dam/product/AHI_43545239393731363731?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(8.99), false, seafood);
        saveProduct("Baguette", "https://static.ah.nl/dam/product/AHI_43545239383738313133?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(2.99), false, bakery);
        saveProduct("Bananas", "https://static.ah.nl/dam/product/AHI_43545239383735353739?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(0.69), false, fruits);
        saveProduct("Iced Tea", "https://static.ah.nl/dam/product/AHI_4354523130303332363731?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(2.19), false, beverages);
        saveProduct("Rice", "https://static.ah.nl/dam/product/AHI_43545239393033323534?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.99), false, pantry);
        saveProduct("Greek Yogurt", "https://static.ah.nl/dam/product/AHI_43545239393032303236?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(2.49), false, dairy);
        saveProduct("Broccoli", "https://static.ah.nl/dam/product/AHI_43545237303333353032?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.49), false, vegetables);
        saveProduct("Pork Chops", "https://static.ah.nl/dam/product/AHI_43545239383638363631?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(6.49), false, meat);
        saveProduct("Mozzarella", "https://static.ah.nl/dam/product/AHI_43545239373439353038?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(4.49), false, dairy);
    }


    private void seedCart() {
        Page<Product> products = productRepository.findAll(PageRequest.of(0,10));
        Cart cart = new Cart();

        int maxQuantity = 10;
        for (Product product : products) {
            int randomQuantity = (int) (Math.random() * maxQuantity);
            cart.getCartProducts().add(new CartProduct(cart, product, randomQuantity));
        }

        cartService.saveCart(cart);
    }
}