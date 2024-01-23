package dev.itvitae.grocerystore.user;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/users")
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping()
    public Iterable<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{email}")
    public User findByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody User user, UriComponentsBuilder ucb) {
        System.out.println("saving user");
        User savedUser = userService.add(user);

        URI locationOfNewRecipe =
                ucb.path("api/v1/user/{id}").buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(locationOfNewRecipe).body(savedUser);
    }
}
