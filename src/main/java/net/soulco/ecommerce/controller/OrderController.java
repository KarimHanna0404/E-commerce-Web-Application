package net.soulco.ecommerce.controller;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.OrderDto;
import net.soulco.ecommerce.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/user/{userId}")
    public List<OrderDto> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }
}
