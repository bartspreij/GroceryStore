package dev.itvitae.grocerystore.products;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String category;
    private String imageLink;
    private BigDecimal price;

    public Product(String name, String category, String imageLink, BigDecimal price) {
        this.name = name;
        this.category = category;
        this.imageLink = imageLink;
        this.price = price;
    }
}