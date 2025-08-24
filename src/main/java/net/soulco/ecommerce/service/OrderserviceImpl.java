package net.soulco.ecommerce.service;

import net.soulco.ecommerce.model.Order;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class OrderserviceImpl implements OrderService {

        private final List<Order> orders = new ArrayList<>();

        public List<Order> getOrderHistory(Long userId) {
            // Filter orders by userId (simulated)
            List<Order> userOrders = new ArrayList<>();
            for (Order order : orders) {
                if (order.getUserId().equals(userId)) {
                    userOrders.add(order);
                }
            }
            // Sort in reverse chronological order
            userOrders.sort(Comparator.comparing(Order::getOrderDate, Collections.reverseOrder()));
            return userOrders;
        }

        public void addOrder(Order order) {
            orders.add(order);
        }
    }

