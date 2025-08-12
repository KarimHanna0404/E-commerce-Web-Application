package net.soulco.ecommerce.service;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.repo.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDto create(String name, String description, String price, String code, MultipartFile image) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(new BigDecimal(price));
            product.setCode(code);
            product.setImage(image.getBytes());

            Product savedProduct = productRepository.save(product);

            return mapToDto(savedProduct);
        } catch (IOException e) {
            throw new RuntimeException("Error processing image file", e);
        }
    }

    @Override
    public List<ProductDto> findAll() {
        return List.of();
    }

    @Override
    public ProductDto findbyId(Long id) {
        return null;
    }

    @Override
    public ProductDto update(String name, String Description, String price, String code, MultipartFile image) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
