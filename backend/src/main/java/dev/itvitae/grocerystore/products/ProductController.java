package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final TagRepository tagRepository;

    @GetMapping("/findall")
    public Iterable<ProductDTO> findAll(){
        return productRepository.findAll().stream().map(ProductDTO::new).toList();
    }

    @GetMapping("/test")
    public ProductDTO makeTestProduct() {
        Tag fruit = new Tag("Fruit");
        Tag healthy = new Tag("Healthy");

        tagRepository.save(fruit);
        tagRepository.save(healthy);

        Product product = new Product("Appel", "google.com", BigDecimal.ONE, fruit, healthy);
        return new ProductDTO(productRepository.save(product));
    }
}
