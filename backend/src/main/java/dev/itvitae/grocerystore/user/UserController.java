package dev.itvitae.grocerystore.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping()
    public Page<User> getAllUsers(Pageable pageable) {
        return userService.getAll(pageable);
    }

    @GetMapping("/{email}")
    public User findByEmail(@PathVariable("email") String email){
        return userService.findByEmail(email);
    }

    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody User user, UriComponentsBuilder ucb){
        User savedUser = userService.addUser(user);

        URI locationOfNewRecipe = ucb
                .path("api/v1/user/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity
                .created(locationOfNewRecipe)
                .body(savedUser);
    }


}
