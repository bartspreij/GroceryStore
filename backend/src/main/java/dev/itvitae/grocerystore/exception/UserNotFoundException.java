package dev.itvitae.grocerystore.exception;

import java.util.NoSuchElementException;

public class UserNotFoundException extends NoSuchElementException {
    public UserNotFoundException(String identifierName) {
        super("User with email %s is not found".formatted(identifierName));
    }
}