package dev.itvitae.grocerystore.products;

import java.math.BigDecimal;

public record ProductModel(String name, BigDecimal price, String imageUrl, String description, Long categoryId, Long[] tagIds) {
}
