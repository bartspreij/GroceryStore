package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.producttags.ProductTag;
import dev.itvitae.grocerystore.tags.Tag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductTag> productTags = new ArrayList<>();

    public Product(String name, BigDecimal price, Tag...tags) {
        this.name = name;
        this.category = category;
        this.imageLink = imageLink;
        this.price = price;

        for(var tag : tags) {
            productTags.add(new ProductTag(this, tag));
        }
    }
}