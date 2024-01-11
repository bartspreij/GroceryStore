package dev.itvitae.grocerystore.tags;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.itvitae.grocerystore.products.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "tags")
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name = "";

    public Tag(String name) {
        this.name = name;
    }
}
