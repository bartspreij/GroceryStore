package dev.itvitae.grocerystore.products;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping("/findall")
    public Iterable<Product> findAll(){
        return productRepository.findAll();
    }

    @PostMapping("/new")
    public Product makeNewProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}
