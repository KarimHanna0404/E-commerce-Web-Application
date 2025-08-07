package net.soulco.ecommerce.service;

import jakarta.servlet.http.HttpSession;
import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final HttpSession session;


    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper , HttpSession session) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.session=session;
    }

    @Override
    public void register(UserDto user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists, use a username that is not taken");
        }
        userRepository.save(userMapper.dtoToEntity(user));
    }


    //.map was replaced with .filter because .map transforms Optional<user> to Optional<Boolean> because
    // it only wants to check if the password matches and if it does not then it triggers the else but .filter keeps Optional<user> so if the username && password match user
    // is kept but if not the Optional becomes empty which triggers the elseThrow
    public Boolean auth(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername())
                .filter(u -> u.getPassword().equals(loginDto.getPassword()))
                .orElseThrow(()-> new RuntimeException("User not found"));


UserDto userDto=userMapper.entityToDto(user);

        session.setAttribute("userData", userDto);
        return true;
    }
    public UserDto showSession(HttpSession session){
        UserDto userDto = (UserDto)session.getAttribute("userData");
        if(userDto !=null)
            return userDto;
        else
            throw new RuntimeException("user not found");

    }
public String DeleteSession(){
    if(session.getAttribute("userData")!=null) {
        session.invalidate();
        return "logout Successful !";
    }
    else
        throw new RuntimeException("you are not logged in ");
}

}
