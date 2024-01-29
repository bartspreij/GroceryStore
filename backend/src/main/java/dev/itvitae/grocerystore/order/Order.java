package dev.itvitae.grocerystore.order;

import dev.itvitae.grocerystore.orderproduct.OrderProduct;
import dev.itvitae.grocerystore.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity()
public class Order {

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  Set<OrderProduct> orderProducts = new HashSet<>();

  @ManyToOne() User user;
  LocalDate date;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
}
