package dev.itvitae.grocerystore.security;

import dev.itvitae.grocerystore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository
        .findByEmail(username)
        .map(MyUserDetails::new)
        .orElseThrow(
            () ->
                new UsernameNotFoundException(
                    String.format("User with email: %s not found", username)));
  }
}
