package dev.itvitae.grocerystore.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import dev.itvitae.grocerystore.tags.Tag;

import java.util.List;
import java.util.UUID;

@Component
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findByProductTags_Tag(Tag tag, Pageable pageable);

    List<Product> findByOnSaleTrue();

    Page<Product> findByNameContainingIgnoreCaseOrProductTags_Tag_NameContainingIgnoreCase(String name, String tagName,
            Pageable pageable);
}
