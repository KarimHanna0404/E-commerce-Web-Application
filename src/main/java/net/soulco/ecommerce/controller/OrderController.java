package net.soulco.ecommerce.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.CreateOrderRequest;
import net.soulco.ecommerce.dto.OrderDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderDto> getOrdersByUser(HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("User is not logged in");
        }
        return orderService.getOrdersByUserId(loggedUser.getId());
    }

    @PostMapping
    public ResponseEntity<OrderDto> create(@Valid @RequestBody CreateOrderRequest request, HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");

        if (loggedUser == null) {
            throw new RuntimeException("User is not logged in");
        }
        OrderDto created = orderService.createOrder(loggedUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
