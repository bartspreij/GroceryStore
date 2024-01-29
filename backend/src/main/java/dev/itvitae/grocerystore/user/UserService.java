package dev.itvitae.grocerystore.user;

import dev.itvitae.grocerystore.exception.UserAlreadyExistsException;
import dev.itvitae.grocerystore.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Transactional
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public List<UserDTO> getAllUsersAsDTO() {
    return userRepository.findAll().stream()
        .map(user -> new UserDTO(user.getId(), user.getFullName(), user.getEmail()))
        .collect(Collectors.toList());
  }

  public User saveUser(User user) {
    Optional<User> theUser = userRepository.findByEmail(user.getEmail());
    if (theUser.isPresent()) {
      throw new UserAlreadyExistsException(user.getEmail());
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles("USER");
    return userRepository.save(user);
  }

  public void deleteUser(String email) {
    userRepository.deleteByEmail(email);
  }

  public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
  }

  public User updateUser(User user) {
    user.setRoles(user.getRoles());
    return userRepository.save(user);
  }
}
