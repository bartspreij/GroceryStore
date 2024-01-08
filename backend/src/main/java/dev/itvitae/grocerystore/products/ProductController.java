package dev.itvitae.grocerystore.products;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping("/findall")
    public Iterable<Product> findAll(){
        return productRepository.findAll();
    }


}
