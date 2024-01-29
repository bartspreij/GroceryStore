package dev.itvitae.grocerystore.user;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/users")
@RestController
public class UserController {

  private final UserService userService;

  @GetMapping()
  public Iterable<UserDTO> getAllUsers() {
    return userService.getAllUsersAsDTO();
  }

  @GetMapping("/{email}")
  public User findByEmail(@PathVariable("email") String email) {
    return userService.getUserByEmail(email);
  }

  @PostMapping()
  public ResponseEntity<UserDTO> saveUser(@RequestBody User user, UriComponentsBuilder ucb) {
    User savedUser = userService.saveUser(user);

    URI locationOfNewRecipe =
        ucb.path("api/v1/user/{id}").buildAndExpand(savedUser.getId()).toUri();

    return ResponseEntity.created(locationOfNewRecipe).body(new UserDTO(savedUser));
  }
}
