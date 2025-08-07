package net.soulco.ecommerce.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// controller
// |
// service
// |
// repo

// DTO Pattern (why??)
// mapping => mapstruct


@RestController
@RequestMapping(value = "api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public String registerUser(@Valid @RequestBody UserDto user) {
        userService.register(user);
        return "User registered successfully!";
    }




    @PostMapping(value = "/login")
    public Boolean login(@Valid @RequestBody LoginDto login) {
        return userService.auth(login);
    }

    //function to test session
    @GetMapping("/session")
  public UserDto showUserDetails (HttpSession session){return userService.showSession(session);}

    @PostMapping(value="/logout")
    public String logout(){ return userService.DeleteSession();}




}
