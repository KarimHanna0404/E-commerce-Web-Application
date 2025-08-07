package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;

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
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists, use a username that is not taken");
        }
        userRepository.save(userMapper.dtoToEntity(user));
    }

    public Boolean auth(LoginDto loginDto) {
        var exists = userRepository.findByEmail(loginDto.getUsername())
                .map(user -> user.getPassword().equals(loginDto.getPassword()))
                .orElse(false);
        if (!exists)
            throw new RuntimeException("User not found");
        return true;
    }
}
