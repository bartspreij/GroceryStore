package dev.itvitae.grocerystore.security;

import dev.itvitae.grocerystore.user.User;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
public class MyUserDetails implements UserDetails {

  private String username;
  private String password;
  private List<GrantedAuthority> authorities;

  public MyUserDetails(User user) {
    username = user.getEmail();
    password = user.getPassword();
    authorities =
        Arrays.stream(user.getRoles().split(","))
            .map(
                role -> new SimpleGrantedAuthority("ROLE_" + role)) // add default ROLE_ prefix here
            // cause spring expects it and it
            // avoids the duplication
            .collect(Collectors.toList());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
