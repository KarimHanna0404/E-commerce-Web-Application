package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@lombok.Data
@NoArgsConstructor
@Getter
@Setter

public class ProductDto {

    @NotEmpty(message = "Do not leave Name field empty")
    @Size(max = 255, message = "Name must be at most 255 characters")
    String name;
    @NotEmpty(message = "Do not leave Description field empty")
    String description;
    @NotEmpty(message = "Do not leave Image field empty")
    String imageUrl;
    @NotEmpty(message = "Do not leave price field empty")
    @Positive(message = "Price Cannot be a negative value")
    BigDecimal price;
    //alphanumerical code associated with each product
    @NotBlank(message = "Code is required")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Code must contain only letters and digits")
    String code;




}
