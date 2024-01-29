package dev.itvitae.grocerystore.security.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/auth")
@RestController
public class JWTController {

  private final JWTService jwtService;
  private final AuthenticationManager authenticationManager;

  @PostMapping
  public String getTokenForAuthenticatedUser(
      @RequestBody JWTAuthenticationRequest authenticationRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(), authenticationRequest.getPassword()));
    if (authentication.isAuthenticated()) {
      return jwtService.generateUserJWT(authenticationRequest.getUsername());
    } else {
      throw new UsernameNotFoundException("Invalid user credentials");
    }
  }
}
