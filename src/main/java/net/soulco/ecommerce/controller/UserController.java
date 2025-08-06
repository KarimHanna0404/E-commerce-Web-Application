package net.soulco.ecommerce.controller;

import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.UserRepository;
import net.soulco.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
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





    @Autowired
    private final UserService userService;

    public UserController(UserService userService ) {

        this.userService = userService;

    }

    @PostMapping("register")
    public String registerUser(@RequestBody UserDto user) {
        userService.register(user);
        return "User registered successfully!";
    }


    @RequestMapping(value = "/login" , method = RequestMethod.GET)
    public String showlogin (){
         return "login.component";

    }



    @RequestMapping(value = "/login" ,method = RequestMethod.POST)
public String login ( @RequestParam String email , @RequestParam String password , ModelMap map){

        boolean success = userService.auth(email , password);

        if (success)
            return "redirect:/home";

        else {
            map.addAttribute("error", "invalid credentials");
            return "login.component" ;
        }
    }

}
