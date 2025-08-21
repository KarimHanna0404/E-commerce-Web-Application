package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.Product;

import java.util.List;

public interface ProductService {

   ProductDto createProduct(ProductDto dto, UserDto userDto);

    ProductDto getProductById(Long id);

   ProductDto updateProduct(Long id, ProductDto dto, String username);

    void deleteProduct(Long id, String username);

    List<ProductDto> search(String username, String query);

    int getTotalProductCountForUser(String username);

    int getSearchedProductCount(String username, String name);

}