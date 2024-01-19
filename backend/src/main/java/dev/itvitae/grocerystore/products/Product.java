package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.tags.Tag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private boolean onSale;

    @ManyToMany
    private Set<Tag> tags = new HashSet<>();

    public Product(String name, String description, String imageUrl, BigDecimal price, Tag...tags) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.onSale = onSale;

        Collections.addAll(this.tags, tags);
    }
}