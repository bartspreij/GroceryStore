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
@Entity(name = "`user`")
public class User {

    @OneToMany Set<Order> orders = new HashSet<>();
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private String role;

    public User(String firstName, String password, String email, String role) {
        this.firstName = firstName;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
