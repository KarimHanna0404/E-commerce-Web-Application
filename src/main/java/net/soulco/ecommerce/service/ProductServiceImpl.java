package net.soulco.ecommerce.service;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product createProduct(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCode(dto.getCode());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product updateProduct(Long id, ProductDto dto) {
        Product product = getProductById(id);
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCode(dto.getCode());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
