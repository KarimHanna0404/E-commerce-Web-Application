package net.soulco.ecommerce.service;

import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.mapper.ProductMapper;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final UserMapper userMapper;

    @Override
    public ProductDto createProduct(ProductDto dto, UserDto userDto) {
        Product product = productMapper.dtoToEntity(dto);
        product.setUser(userMapper.dtoToEntity(userDto));
        Product saved = productRepository.save(product);
        return productMapper.entityToDto(saved);
    }

    // TODO: THIS SHOULD GET THE PRODUCTS FOR A CERTAIN USER
    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::entityToDto)
                .toList();
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return productMapper.entityToDto(product);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));

        // TODO: THIS UPDATE CAN BE DONE USING THE MAPPER AS WELL.
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCode(dto.getCode());
        product.setImageUrl(dto.getImageUrl());

        Product updated = productRepository.save(product);
        return productMapper.entityToDto(updated);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }
}