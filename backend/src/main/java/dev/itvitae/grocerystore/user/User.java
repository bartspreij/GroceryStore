package dev.itvitae.grocerystore.user;

import dev.itvitae.grocerystore.order.Order;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor()
@Entity()
public class User {

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  Set<Order> orders = new HashSet<>();

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fullName;
  private String email;
  private String password;
  private String roles;

  public User(String fullName, String password, String email, String roles) {
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.roles = roles;
  }
}
