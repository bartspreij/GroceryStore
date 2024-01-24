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

    private String firstName;

    @NaturalId(mutable = true)
    private String email;

    private String password;
    private String roles;

    public User(String firstName, String password, String email, String roles) {
        this.firstName = firstName;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
}
