package dev.itvitae.grocerystore.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import dev.itvitae.grocerystore.tags.Tag;

import java.time.LocalDate;

@Component
public interface ProductRepository extends JpaRepository<Product, Long> {
  Page<Product> findByTags(Tag tag, Pageable pageable);

  Page<Product> findByNameContainingIgnoreCaseOrTags_NameContainingIgnoreCase(
      String name, String tagName, Pageable pageable);

  @Query("SELECT p FROM Product p WHERE p IN (SELECT d.product FROM Discount d WHERE d.startDate <= ?1 AND d.endDate >= ?1)")
  Iterable<ProductDTO> findByValidDiscount(LocalDate date);
}
