package net.soulco.ecommerce.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.service.ProductService;
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

    @GetMapping
    public List<ProductDto> getProductsByOwner(@RequestParam(required = false) String username, HttpSession session) {

        UserDto loggedUser = (UserDto) session.getAttribute("userData");
        if (loggedUser == null) {
            throw new RuntimeException("You must be logged in to add a product");
        }
        String effectiveUsername;
        if(username == null || username.isBlank()){
            effectiveUsername = loggedUser.getUsername();
        }
        else{
            effectiveUsername = username;
        }

        return productService.getProductsByOwnerUsername(effectiveUsername);
    }

    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto dto) {
        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/search")
    public List<Product> findAllByUserUsername(@RequestParam String name){
        return productService.findAllByUserUsername(name);
    }
}


// NOTES
// LIQUIBASE => ORDER OF EXECUTION, NOT NEEDED EMPTY CHECKS, FOREIGN KEY WRONG TABLE NAME AND TYPES
// HIBERNATE => ENABLING HIBERNATE DDL
// PRODUCT => FORGETTING @Valid IN CREATE METHOD, SOME TODOS IN SERVICE
