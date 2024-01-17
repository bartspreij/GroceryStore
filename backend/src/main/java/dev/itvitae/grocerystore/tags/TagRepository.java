package dev.itvitae.grocerystore.tags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface TagRepository extends JpaRepository<Tag, Long>{
    Optional<Tag> findByName(String name);
    Iterable<Tag> findByIsCategoryTrue();
}
