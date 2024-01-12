package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class ProductSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final TagRepository tagRepository;

    private void saveProduct(String name, String imageUrl, BigDecimal price, Tag...tags){
        Product product = new Product(name, imageUrl, price, tags);
        productRepository.save(product);
    }

    private Tag saveTag(String name) {
        Tag tag = new Tag(name);
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public void run(String... args) throws Exception {
        Tag fruit = saveTag("Fruit");
        Tag potassium = saveTag("Potassium");
        Tag meat = saveTag("Meat");
        Tag dairy = saveTag("Dairy");

        saveProduct("Apple", "https://i.imgur.com/TVN1Hs5.jpeg", BigDecimal.valueOf(0.89), fruit);
        saveProduct("Banana", "https://i.imgur.com/xhlyEjv.png", BigDecimal.valueOf(1.29), fruit, potassium);
        saveProduct("Minced Beef", "https://static.ah.nl/dam/product/AHI_4354523130303233323432?revLabel=1&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(3.49), meat);
        saveProduct("Milk", "https://static.ah.nl/dam/product/AHI_43545239393331383832?revLabel=6&rendition=800x800_JPG_Q90&fileType=binary", BigDecimal.valueOf(1.89), dairy);
    }
}
