package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.CreateOrderRequest;
import net.soulco.ecommerce.dto.OrderDto;

import java.util.List;

public interface OrderService {
    List<OrderDto> getOrdersByUserId(Long userId);

    OrderDto createOrder(Long userID, CreateOrderRequest request);
}
