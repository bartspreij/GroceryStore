package dev.itvitae.grocerystore.tags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TagRepository extends JpaRepository<Tag, Long>{

}
