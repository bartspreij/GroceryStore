package dev.itvitae.grocerystore.tags;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TagRepository extends JpaRepository<Tag, Long> {
  Optional<Tag> findByName(String name);

  Iterable<Tag> findByIsCategoryTrue();
}
