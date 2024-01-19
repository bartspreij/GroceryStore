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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductRepository productRepository;
  private final TagRepository tagRepository;

  @GetMapping("/test")
  public ProductDTO makeTestProduct() {
    Tag fruit = new Tag("Fruit", true);
    Tag healthy = new Tag("Healthy", false);

    tagRepository.save(fruit);
    tagRepository.save(healthy);

    Product product = new Product("Appel", "empty", "google.com", BigDecimal.ONE, fruit, healthy);
    productRepository.save(product);

    return new ProductDTO(product);
  }

  @GetMapping("/onsale")
  public List<Product> getOnSaleProducts() {
    return productRepository.findByOnSaleTrue();
  }

  @GetMapping("/query")
  public ResponseEntity<?> query(
      @RequestParam(name = "q", required = false) String query,
      @RequestParam(name = "c", required = false) String categoryName,
      @RequestParam(name = "page", defaultValue = "0") int page,
      @RequestParam(name = "size", defaultValue = "20") int size,
      @RequestParam(name = "sort", defaultValue = "id,desc") String sort) {

    Pageable pageable = createPageable(sort, page, size);

    // Replace + with spaces
    if (query != null) query = query.replaceAll("\\+", " ");
    if (categoryName != null) categoryName = categoryName.replaceAll("\\+", " ");

    Page<Product> results;
    if (query != null && !query.isEmpty())
      results =
          productRepository.findByNameContainingIgnoreCaseOrTags_NameContainingIgnoreCase(
              query, query, pageable);
    else if (categoryName != null && !categoryName.isEmpty()) {
      Optional<Tag> tag = tagRepository.findByName(categoryName);
      if (tag.isEmpty()) return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND);
      results = productRepository.findByTags(tag.get(), pageable);
    } else results = productRepository.findAll(pageable);

    return new ResponseEntity<Page<ProductDTO>>(results.map(ProductDTO::new), HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<?> addProduct(@RequestBody ProductDTO dto) {
    String name = dto.name();
    String description = dto.description();
    String imageUrl = dto.imageUrl();
    BigDecimal price = dto.price();
    Tag[] tags = dto.tags();

    Product product = new Product(name, description, imageUrl, price, tags);
    productRepository.save(product);

    return new ResponseEntity<>(new ProductDTO(product), HttpStatus.OK);
  }

  @PatchMapping()
  public ResponseEntity<?> patchProduct(@RequestBody ProductDTO dto) {
    Long id = dto.id();
    String name = dto.name();
    String description = dto.description();
    String imageUrl = dto.imageUrl();
    BigDecimal price = dto.price();
    Tag[] tags = dto.tags();

    Product product = productRepository.findById(id).orElse(null);

    if (product == null) return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);

    // Update properties
    product.setName(name);
    product.setDescription(description);
    product.setImageUrl(imageUrl);
    product.setPrice(price);

    // Find tags for the thingamajig
    Set<Tag> newTags = new HashSet<>();
    for (var tag : tags) {
      Optional<Tag> databaseTag = tagRepository.findById(tag.getId());
      databaseTag.ifPresent(newTags::add);
    }

    product.setTags(newTags);
    productRepository.save(product);

    return new ResponseEntity<>(new ProductDTO(product), HttpStatus.OK);
  }

  @DeleteMapping("{productId}")
  public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {

    Product product = productRepository.findById(productId).orElse(null);

    if (product == null) return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);

    productRepository.delete(product);

    return new ResponseEntity<>("Delete success", HttpStatus.OK);
  }

  private static Pageable createPageable(String sort, int page, int size) {
    String[] sortArray = sort.split(",");
    String sortBy = sortArray[0];
    String sortDirection = sortArray.length > 1 ? sortArray[1] : "asc";

    Sort sortObj = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
    return PageRequest.of(page, size, sortObj);
  }
}
