package net.soulco.ecommerce.repo;

import net.soulco.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Correct way: navigate into Order.user.id
    List<Order> findByUser_Id(Long userId);
}
