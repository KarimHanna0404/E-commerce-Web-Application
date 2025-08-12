package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
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
    @NotEmpty(message = "Email is required")
    private String email;

    // required
    @NotEmpty(message = "Password is required")
    private String password;

    // required
    @NotEmpty(message = "First Name is required")
    private String firstname;

    // required
    @NotEmpty(message = "Last Name is required")
    private String lastname;

    // required
    @NotEmpty(message = "User Name is required")
    private String username;
}
