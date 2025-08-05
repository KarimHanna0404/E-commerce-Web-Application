package net.soulco.ecommerce.Service;

import net.soulco.ecommerce.Model.User;
import net.soulco.ecommerce.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public String showSignUpForm(Model model) {
        model.addAttribute("user", new User());
        return "sign up form";
    }


    public String processRegisterion(User user) {
            userRepository.save(user);
            return "User registered successfully!";
        }
}
