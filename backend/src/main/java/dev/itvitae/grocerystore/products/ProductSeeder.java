package dev.itvitae.grocerystore.products;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class ProductSeeder implements CommandLineRunner {

    private void saveProduct(String name, String imageLink, BigDecimal price, String ...category){
        Product product = new Product(name, category[0], imageLink, price);
        productRepository.save(product);
    }

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
            String fruit = "Fruit";
            String potassium = "Potassium";

            saveProduct("Apple", "https://i.imgur.com/TVN1Hs5.jpeg", BigDecimal.valueOf(0.89), fruit);

            saveProduct("Banana", "https://i.imgur.com/xhlyEjv.png", BigDecimal.valueOf(1.29), fruit, potassium);

    }
}
