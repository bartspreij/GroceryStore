package dev.itvitae.grocerystore.products;

import java.math.BigDecimal;

import dev.itvitae.grocerystore.producttags.ProductTag;
import dev.itvitae.grocerystore.tags.Tag;

public record ProductDTO(Long id, String name, BigDecimal price, String imageUrl, boolean onSale, Tag[] tags) {
    public ProductDTO(Product product) {
        this(product.getId(), product.getName(), product.getPrice(), product.getImageUrl(), product.isOnSale(),
       product.getProductTags().stream()
            .map(ProductTag::getTag)
            .toArray(Tag[]::new));
    }
            
}
