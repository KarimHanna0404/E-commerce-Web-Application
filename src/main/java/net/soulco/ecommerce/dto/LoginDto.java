package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotEmpty(message = "username is required")
    private String username;

    @NotEmpty(message = "password is required")
    @Pattern(regexp = "") // contain small letter and capital letter, one number, one special charater
    private String password;
}
