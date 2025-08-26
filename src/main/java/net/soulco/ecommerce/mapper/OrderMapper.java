package net.soulco.ecommerce.mapper;

import net.soulco.ecommerce.dto.OrderDto;
import net.soulco.ecommerce.dto.OrderItemDto;
import net.soulco.ecommerce.model.Order;
import net.soulco.ecommerce.model.OrderItem;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {

    @Mapping(target = "orderItems", source = "orderItems")
    OrderDto entityToDto(Order order);

    // Keep plural to match service call
    List<OrderDto> entitiesToDtos(List<Order> orders);

    @Mapping(target = "productName", source = "product.name")
    OrderItemDto entityToDto(OrderItem orderItem);
}

