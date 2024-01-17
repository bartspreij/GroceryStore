package dev.itvitae.grocerystore.tags;

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

    private boolean isCategory;

    public Tag(String name, boolean isCategory) {

        this.name = name;
        this.isCategory = isCategory;
    }
}
