package net.soulco.ecommerce.service;

import jakarta.servlet.http.HttpSession;
import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;

public interface UserService {

    void register(UserDto user);

     Boolean auth (LoginDto loginDto);

     UserDto showSession(HttpSession session);

     String DeleteSession();
}
