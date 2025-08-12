package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.ProductDto;
import java.util.List;

public interface ProductService {

   ProductDto createProduct(ProductDto dto);

   List<ProductDto> getAllProducts();

   ProductDto getProductById(Long id);

   ProductDto updateProduct(Long id, ProductDto dto);

   void deleteProduct(Long id);
}