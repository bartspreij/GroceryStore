package dev.itvitae.grocerystore.user;

import dev.itvitae.grocerystore.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@RestController
public class UserController {

    private final UserRepository userRepository;

    @GetMapping()
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{email}")
    public User findByEmail(@PathVariable("email") String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
    }

    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody User user, UriComponentsBuilder ucb){
        User savedUser = userRepository.save(user);

        URI locationOfNewRecipe = ucb
                .path("api/v1/user/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity
                .created(locationOfNewRecipe)
                .body(savedUser);
    }


}
