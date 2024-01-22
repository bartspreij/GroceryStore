package dev.itvitae.grocerystore.discounts;

import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.products.ProductDTO;
import dev.itvitae.grocerystore.products.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/discounts")
public class DiscountController {

    private final DiscountRepository discountRepository;
    private final ProductRepository productRepository;

    @GetMapping()
    public Iterable<ProductDTO> findAll() {
        var discounts = discountRepository.findAll();

        return discounts.stream()
                .map(d -> new ProductDTO(d.getProduct()))
                .toList();
    }

//    @GetMapping()
//    public Iterable<Discount> findDiscounts() {
//        return discountRepository.findByStartDateBetween(startDate, endDate);
//    }

    @PostMapping("add-to-product/{productId}")
    public ResponseEntity<String> addDiscount(@PathVariable Long productId, @RequestBody Discount discount) {
        Optional<Product> findProduct = productRepository.findById(productId);

        if (findProduct.isPresent()) {
            Product product = findProduct.get();
            discount.setProduct(product);
            discountRepository.save(discount);
            return new ResponseEntity<>("Discount added to " + product.getName(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{discountId}")
    public ResponseEntity<String> deleteDiscount(@PathVariable Long discountId) {
        Optional<Discount> discountOptional = discountRepository.findById(discountId);
        if (discountOptional.isPresent()) {
            discountRepository.deleteById(discountId);
            return new ResponseEntity<>("Discount successfully deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Discount not found", HttpStatus.NOT_FOUND);
        }
    }
}