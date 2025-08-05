package net.soulco.ecommerce.Service;

import net.soulco.ecommerce.Model.User;
import net.soulco.ecommerce.Repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(User user) {
        // existsbyusername => throw new RuntimeException("Username already exists");
        userRepository.save(user);
    }
}
