package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

public record CreateOrderRequest(
        @NotNull @Positive BigDecimal totalAmount,
        List<Long> cartItemIds
) {}