package net.soulco.ecommerce.service;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.CreateOrderRequest;
import net.soulco.ecommerce.dto.OrderDto;
import net.soulco.ecommerce.dto.OrderItemDto;
import net.soulco.ecommerce.mapper.OrderMapper;
import net.soulco.ecommerce.model.Order;
import net.soulco.ecommerce.model.OrderItem;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.OrderRepository;
import net.soulco.ecommerce.repo.ProductRepository;
import net.soulco.ecommerce.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepo.findByUser_Id(userId);
        return orderMapper.entitiesToDtos(orders);
    }


    //creating the order and giving each order a unique uuid identifier
    @Override
    public OrderDto createOrder(Long userId, CreateOrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setIdentifier(UUID.randomUUID().toString());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(request.totalAmount());

        List<OrderItem> orderItems = new ArrayList<>();
        List<CreateOrderRequest.Item> items = request.items();
        for(int i =0; i< items.size(); i++){
            CreateOrderRequest.Item item = items.get(i);

            Product product = productRepository.findById(item.productId()).orElseThrow(()->new RuntimeException("Product not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setTotalAmount(product.getPrice().multiply(BigDecimal.valueOf(item.quantity()))
            );

            orderItem.setOrder(order);
            orderItems.add(orderItem);


        }

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepo.save(order);
        return orderMapper.entityToDto(savedOrder);
    }
}
