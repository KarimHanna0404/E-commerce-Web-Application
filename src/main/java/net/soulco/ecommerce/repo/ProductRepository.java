package net.soulco.ecommerce.repo;

import net.soulco.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// ORM (Hibernate)
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p " +
            "where p.user.username = :username and (:name is null or p.name like concat('%', :name, '%'))")
    List<Product> findAllByUsernameAndName(String username, String name);

    @Query("select p from Product p where p.id = :id and p.user.username = :username")
    Optional<Product> findByIdAndUsername(Long id, String username);
}
