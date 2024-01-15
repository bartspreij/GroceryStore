package dev.itvitae.grocerystore.tags;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.itvitae.grocerystore.products.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "tags")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name = "";

    private Boolean isMainCategory;

    public Tag(String name, boolean isMainCategory) {

        this.name = name;
        this.isMainCategory = isMainCategory;
    }
}
