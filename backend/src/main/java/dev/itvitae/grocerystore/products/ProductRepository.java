package dev.itvitae.grocerystore.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import dev.itvitae.grocerystore.tags.Tag;

@Component
public interface ProductRepository extends JpaRepository<Product, Long> {
  Page<Product> findByTags(Tag tag, Pageable pageable);

  Page<Product> findByNameContainingIgnoreCaseOrTags_NameContainingIgnoreCase(
      String name, String tagName, Pageable pageable);
}
