package net.soulco.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDto {
    // TODO: Better Approach To Use ProductDto
    private ProductDto productDto;
    private Integer quantity;
    private BigDecimal totalAmount;
}
