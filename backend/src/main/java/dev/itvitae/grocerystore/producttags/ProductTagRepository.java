package dev.itvitae.grocerystore.producttags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductTagRepository extends JpaRepository<ProductTag, Long>{

}
