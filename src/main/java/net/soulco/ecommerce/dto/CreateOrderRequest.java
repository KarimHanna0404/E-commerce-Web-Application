package net.soulco.ecommerce.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record CreateOrderRequest(
        @NotNull List<Item> items
) {
    // Nested record to represent each order line
    public record Item(
            @NotNull Long productId,
            @Positive int quantity
    ) {}
}