package net.soulco.ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotEmpty(message = "Do not leave Name field empty")
    @Size(max = 255, message = "Name must be at most 255 characters")
    private String name;

    @NotEmpty(message = "Do not leave Description field empty")
    private String description;

    @NotEmpty(message = "Do not leave Image field empty")
    private String imageUrl;

    @NotNull(message = "Do not leave price field empty")
    @Positive(message = "Price Cannot be a negative value")
    private BigDecimal price;

    @NotBlank(message = "Code is required")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Code must contain only letters and digits")
    private String code;
}

