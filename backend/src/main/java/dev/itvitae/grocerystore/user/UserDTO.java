package dev.itvitae.grocerystore.user;

public record UserDTO(Long id, String firstName, String email) {
  public UserDTO(User user) {
    this(user.getId(), user.getFullName(), user.getEmail());
  }
}
