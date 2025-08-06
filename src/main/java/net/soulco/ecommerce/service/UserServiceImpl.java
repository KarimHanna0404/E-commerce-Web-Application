package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {



    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public void register(UserDto user) {
        if(userRepository.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already exists, use a username that is not taken");
        }
        userRepository.save(userMapper.dtoToEntity(user));
    }

    public Boolean auth ( String email, String password){

        return userRepository.findByEmail(email)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);

    }



}
