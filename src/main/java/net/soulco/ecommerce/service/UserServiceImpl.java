package net.soulco.ecommerce.service;

import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void register(User user) {
        // existsbyusername => throw new RuntimeException("Username already exists");

        if(userRepository.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already exists, use a username that is not taken");
        }
        userRepository.save(user);
    }
}
