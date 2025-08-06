package net.soulco.ecommerce.service;

import net.soulco.ecommerce.model.User;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserService {

    void register(User user);
    Boolean auth ( String email, String password);
}
