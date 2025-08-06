package net.soulco.ecommerce.service;

import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

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

    public Boolean auth ( String email, String password){

        return userRepository.findByEmail(email)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);

    }



}
