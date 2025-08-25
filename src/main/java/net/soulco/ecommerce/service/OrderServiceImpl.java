package net.soulco.ecommerce.service;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.OrderDto;
import net.soulco.ecommerce.mapper.OrderMapper;
import net.soulco.ecommerce.model.Order;
import net.soulco.ecommerce.repo.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;
    private final OrderMapper orderMapper;

    @Override
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepo.findByUser_Id(userId);
        return orderMapper.entitiesToDtos(orders);
    }
}
