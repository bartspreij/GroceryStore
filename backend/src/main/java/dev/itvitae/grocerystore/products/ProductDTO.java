package dev.itvitae.grocerystore.products;

import java.math.BigDecimal;
import dev.itvitae.grocerystore.tags.Tag;

public record ProductDTO(Long id, String name, String description, BigDecimal price, String imageUrl, Tag[] tags) {
    public ProductDTO(Product product) {
        this(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImageUrl(),
       product.getTags().toArray(new Tag[0]));
    }
            
}
