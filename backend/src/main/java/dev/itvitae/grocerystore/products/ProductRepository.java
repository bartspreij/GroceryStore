package dev.itvitae.grocerystore.products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface ProductRepository extends JpaRepository<Product, UUID>{

}
