package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.UserDto;

public interface UserService {

    void register(UserDto user);

     Boolean auth ( String email, String password);
}
