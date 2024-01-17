package dev.itvitae.grocerystore.user;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String user) {
        return userRepository.findByEmail(user).get();
    }

}
