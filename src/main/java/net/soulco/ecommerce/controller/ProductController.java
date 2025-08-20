package net.soulco.ecommerce.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductDto createProduct(@RequestBody @Valid ProductDto dto, HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("You must be logged in to add a product");
        }
        return productService.createProduct(dto, loggedUser);
    }

    @GetMapping("/search")
    public List<ProductDto> searchProducts(@RequestParam(required = false) String query, HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("User is not logged in");
        }
        return productService.search(loggedUser.getUsername(), query);
    }

    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto dto, HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("User is not logged in");
        }

        return productService.updateProduct(id, dto, loggedUser.getUsername());
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204
    public void deleteProduct(@PathVariable Long id, HttpSession session) {
        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("User is not logged in");
        }
        productService.deleteProduct(id, loggedUser.getUsername());
    }

}
