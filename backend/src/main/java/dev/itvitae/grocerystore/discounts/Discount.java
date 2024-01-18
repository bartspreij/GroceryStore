package dev.itvitae.grocerystore.discounts;

import dev.itvitae.grocerystore.products.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal discountedPrice;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    private Product product;

    public Discount (double discountedPrice, LocalDate startDate, LocalDate endDate, Product product) {
        this.discountedPrice = BigDecimal.valueOf(discountedPrice);
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;


    }
}
