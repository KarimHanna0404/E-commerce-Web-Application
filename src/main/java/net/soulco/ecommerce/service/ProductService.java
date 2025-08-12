package net.soulco.ecommerce.service;

import net.soulco.ecommerce.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

   ProductDto create(String name, String Description, String price, String code, MultipartFile image);

   List<ProductDto> findAll();

   ProductDto findbyId(Long id);

   ProductDto update(String name, String Description, String price, String code, MultipartFile image);

   void delete(Long id);


}
