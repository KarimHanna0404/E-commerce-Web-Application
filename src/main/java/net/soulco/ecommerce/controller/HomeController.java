package net.soulco.ecommerce.controller;

import net.soulco.ecommerce.Model.User;
import net.soulco.ecommerce.Repo.UserRepository;
import net.soulco.ecommerce.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private UserRepository  userRepository;

    @GetMapping("/")
    public String hello() {
        return "Hello from Spring Boot!";
    }


    @GetMapping("/register")
    public String showSignUpForm(Model model) {
        model.addAttribute("user", new User());
        return "sign up form";
    }

    @PostMapping("register_sucess")
    public String processRegisterion(User user) {
        userRepository.save(user);
        return "User registered successfully!";
    }



}
