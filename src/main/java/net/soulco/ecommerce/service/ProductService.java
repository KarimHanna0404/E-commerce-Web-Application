package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.model.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(ProductDto dto);

    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product updateProduct(Long id, ProductDto dto);

    void deleteProduct(Long id);
}
