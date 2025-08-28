package net.soulco.ecommerce.service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @Override
    public void register(UserDto user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists, use a username that is not taken");
        }
        userRepository.save(userMapper.dtoToEntity(user));
    }


    public Boolean auth(LoginDto loginDto, HttpSession session) {
        User user = userRepository.findByUsername(loginDto.getUsername())
                .filter(u -> u.getPassword().equals(loginDto.getPassword()))
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserDto userDto = userMapper.entityToDto(user);
        session.setAttribute("userData", userDto);
        return true;
    }

    public UserDto showSession(HttpSession session) {
        UserDto userDto = (UserDto) session.getAttribute("userData");
        if (userDto != null)
            return userDto;
        else
            throw new RuntimeException("user not found");
    }

    public String DeleteSession(HttpSession session) {
        if (session.getAttribute("userData") != null) {
            session.invalidate();
            return "logout Successful !";
        } else
            throw new RuntimeException("you are not logged in ");
    }

}
