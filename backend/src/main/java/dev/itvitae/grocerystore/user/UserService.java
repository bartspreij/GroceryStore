package dev.itvitae.grocerystore.user;

import dev.itvitae.grocerystore.exception.UserAlreadyExistsException;
import dev.itvitae.grocerystore.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public List<UserDTO> getAllUsersAsDTO() {
    return userRepository.findAll().stream()
        .map(user -> new UserDTO(user.getId(), user.getFullName(), user.getUsername()))
        .collect(Collectors.toList());
  }

  public User saveUser(User user) {
    Optional<User> theUser = userRepository.findByUsername(user.getUsername());
    if (theUser.isPresent()) {
      throw new UserAlreadyExistsException(user.getUsername());
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles("USER");
    return userRepository.save(user);
  }

  public void deleteUser(String email) {
    userRepository.deleteByUsername(email);
  }

  public User getUserByEmail(String email) {
    return userRepository.findByUsername(email).orElseThrow(() -> new UserNotFoundException(email));
  }

  public User updateUser(User user) {
    user.setRoles(user.getRoles());
    return userRepository.save(user);
  }
}
