package dev.itvitae.grocerystore.discounts;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DiscountDTO(
    Long id, BigDecimal discountedPrice, LocalDate startDate, LocalDate endDate) {
  public DiscountDTO(Discount discount) {
    this(
        discount.getId(),
        discount.getDiscountedPrice(),
        discount.getStartDate(),
        discount.getEndDate());
  }
}
