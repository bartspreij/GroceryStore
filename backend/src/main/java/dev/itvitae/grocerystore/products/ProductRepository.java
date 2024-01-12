package dev.itvitae.grocerystore.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import dev.itvitae.grocerystore.tags.Tag;

import java.util.UUID;

@Component
public interface ProductRepository extends JpaRepository<Product, UUID>{
    Page<Product> findByProductTags_Tag(Tag tag, Pageable pageable);
    Page<Product> findByNameIgnoreCase(String name, Pageable pageable);
}
