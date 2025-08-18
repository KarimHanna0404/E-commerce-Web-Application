package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.Product;

import java.util.List;

public interface ProductService {

   ProductDto createProduct(ProductDto dto, UserDto userDto);


    // TODO: THIS SHOULD GET THE PRODUCTS FOR A CERTAIN USER
    List<ProductDto> getProductsByOwnerUsername(String username);

    ProductDto getProductById(Long id);

   ProductDto updateProduct(Long id, ProductDto dto);

   void deleteProduct(Long id);

   List<Product> findAllByUserUsername(String username);

}