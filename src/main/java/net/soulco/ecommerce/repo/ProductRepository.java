package net.soulco.ecommerce.repo;

import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUser(User user);
    List<Product> findAllByUserUsername(String username);

}
