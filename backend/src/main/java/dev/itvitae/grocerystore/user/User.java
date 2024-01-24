package dev.itvitae.grocerystore.user;

import dev.itvitae.grocerystore.order.Order;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.Set;

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

    @NaturalId(mutable = true)
    private String username;

    private String password;
    private String roles;

    public User(String fullName, String password, String username, String roles) {
        this.fullName = fullName;
        this.password = password;
        this.username = username;
        this.roles = roles;
    }
}
