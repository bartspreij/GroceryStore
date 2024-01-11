package dev.itvitae.grocerystore.producttags;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.itvitae.grocerystore.products.Product;
import dev.itvitae.grocerystore.tags.Tag;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "product_tags")
@NoArgsConstructor
@AllArgsConstructor
public class ProductTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne
    @JsonBackReference
    private Product product;

    @JoinColumn(name = "tag_id", nullable = false)
    @ManyToOne
    private Tag tag;

    public ProductTag(Product product, Tag tag) {
        this.product = product;
        this.tag = tag;
    }
}
