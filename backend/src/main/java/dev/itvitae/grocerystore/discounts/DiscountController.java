package dev.itvitae.grocerystore.discounts;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1/discounts")
public class DiscountController {

    private final DiscountRepository discountRepository;

    @GetMapping()
    public Iterable<Discount> findAll() {
        return discountRepository.findAll();
    }

//    @GetMapping()
//    public Iterable<Discount> findDiscounts() {
//        return discountRepository.findByStartDateBetween(startDate, endDate);
//    }

    @PostMapping("/new")
    public Discount addDiscount (@RequestBody Discount discount) {
        return discountRepository.save(discount);
    }

    @DeleteMapping("/delete/{discountId}")
    public ResponseEntity<String> deleteDiscount (@PathVariable Long discountId) {
        Optional<Discount> discountOptional = discountRepository.findById(discountId);
        if (discountOptional.isPresent()) {
            discountRepository.deleteById(discountId);
            return new ResponseEntity<>("Discount successfully deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Discount not found", HttpStatus.NOT_FOUND);
        }
    }


}
