package net.soulco.ecommerce.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String Email;

    @Column(name = "password", nullable = false, length = 50)
    private String Password;

    @Column(nullable = false, length = 50)
    private String FirstName;

    @Column(nullable = false, length = 50)
    private String LastName;
}
