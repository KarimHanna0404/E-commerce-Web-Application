package net.soulco.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;

    // required
    private String email;

    // required
    private String password;

    // required
    private String firstname;

    // required
    private String lastname;

    // required
    private String username;
}
