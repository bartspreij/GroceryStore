package dev.itvitae.grocerystore.products;

import dev.itvitae.grocerystore.discounts.Discount;
import dev.itvitae.grocerystore.tags.Tag;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

  @ManyToMany private Set<Tag> tags = new HashSet<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Discount> discounts = new HashSet<>();

  public Product(String name, String description, String imageUrl, BigDecimal price, Tag... tags) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;

    Collections.addAll(this.tags, tags);
  }
}
