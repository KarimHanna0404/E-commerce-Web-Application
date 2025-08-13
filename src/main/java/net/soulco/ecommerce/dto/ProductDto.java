package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductDto {

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

    @Override
    public String toString() {
        return "ProductDto{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", price=" + price +
                ", code='" + code + '\'' +
                '}';
    }
}

