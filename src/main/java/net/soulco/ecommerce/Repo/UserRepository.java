package net.soulco.ecommerce.Repo;

import net.soulco.ecommerce.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {


}
