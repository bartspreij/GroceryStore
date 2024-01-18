package dev.itvitae.grocerystore.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.itvitae.grocerystore.tags.Tag;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    Page<Product> findByTags(Tag tag, Pageable pageable);
    Page<Product> findByNameIgnoreCase(String name, Pageable pageable);
}
