package dev.itvitae.grocerystore.tags;

import dev.itvitae.grocerystore.products.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/tags")
public class TagController {
    private final TagRepository tagRepository;
    private final ProductRepository productRepository;

    @GetMapping()
    public Iterable<Tag> findAll(){
        return tagRepository.findAll();
    }

    @GetMapping("categories")
    public Iterable<Tag> findCategories() {
        return tagRepository.findByIsCategoryTrue();
    }
}
