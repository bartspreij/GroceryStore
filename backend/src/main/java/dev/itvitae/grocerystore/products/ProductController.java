package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.tags.Tag;
import dev.itvitae.grocerystore.tags.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final TagRepository tagRepository;

    @GetMapping("/test")
    public Product makeTestProduct() {
        Tag fruit = new Tag("Fruit");
        Tag healthy = new Tag("Healthy");

        tagRepository.save(fruit);
        tagRepository.save(healthy);

        Product product = new Product("Appel", "google.com", BigDecimal.ONE, fruit, healthy);
        return productRepository.save(product);
    }

    @GetMapping("/query")
    public ResponseEntity<?> query(
            @RequestParam(name = "q", required = false) String query,
            @RequestParam(name = "c", required = false) String categoryName,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size,
            @RequestParam(name = "sort", defaultValue = "id,desc") String sort){

        Pageable pageable = createPageable(sort, page, size);

        Page<Product> results;
        if (query != null && !query.isEmpty())
            results = productRepository.findByNameIgnoreCase(query, pageable);
        else if(categoryName != null && !categoryName.isEmpty()) {
            Optional<Tag> tag = tagRepository.findByName(categoryName);
            if(tag.isEmpty()) return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND);
            results = productRepository.findByProductTags_Tag(tag.get(), pageable);
        }
        else
            results = productRepository.findAll(pageable);

        return new ResponseEntity<Page<ProductDTO>>(results.map(ProductDTO::new), HttpStatus.OK);
    }

    private static Pageable createPageable(String sort, int page, int size) {
        String[] sortArray = sort.split(",");
        String sortBy = sortArray[0];
        String sortDirection = sortArray.length > 1 ? sortArray[1] : "asc";

        Sort sortObj = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        return PageRequest.of(page, size, sortObj);
    }
}
