package dev.itvitae.grocerystore.discounts;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
