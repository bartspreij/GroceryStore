package dev.itvitae.grocerystore.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

@Getter
@Setter
@NoArgsConstructor()
@Entity(name = "`user`")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
