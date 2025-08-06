package net.soulco.ecommerce.controller;

import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String registerUser(@RequestBody UserDto user) {
        userService.register(user);
        return "User registered successfully!";
    }
}
