package dev.itvitae.grocerystore.exception;

public class UserAlreadyExistsException extends IllegalArgumentException {
  public UserAlreadyExistsException(String message) {
    super(message);
  }
}
