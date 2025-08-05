package net.soulco.ecommerce.controller;

import net.soulco.ecommerce.Model.User;
import net.soulco.ecommerce.Repo.UserRepository;
import net.soulco.ecommerce.Service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// controller
// |
// service
// |
// repo


@RestController
@RequestMapping(value = "api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public String registerUser(@RequestBody User user) {
        userService.register(user);
        return "User registered successfully!";
    }
}
