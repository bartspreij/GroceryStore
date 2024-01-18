package dev.itvitae.grocerystore.discounts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    Iterable<Discount>findByStartDateAfterAndFindByEndDateBefore();

}
