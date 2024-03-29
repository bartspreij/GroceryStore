package dev.itvitae.grocerystore.exception;

import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<ProblemDetail> handleNotFoundException(NoSuchElementException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    return new ResponseEntity<>(problemDetail, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ProblemDetail> handleAlreadyExistsException(UsernameNotFoundException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
    return new ResponseEntity<>(problemDetail, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ProblemDetail> handleAuthenticationException(AuthenticationException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
    return new ResponseEntity<>(problemDetail, HttpStatus.UNAUTHORIZED);
  }

  // Thread on appropriate status code
  // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists/70371989#70371989
  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<ProblemDetail> handleAlreadyExistsException(UserAlreadyExistsException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
    return new ResponseEntity<>(problemDetail, HttpStatus.CONFLICT);
  }
}
