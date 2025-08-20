package net.soulco.ecommerce.service;

import jakarta.transaction.Transactional;
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

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return productMapper.entityToDto(product);
    }


    // TODO: PRODUCT IS ONLY EDITABLE BY ITS OWN USER
    @Override
    public ProductDto updateProduct(Long id, ProductDto dto, String username) {
        Product product = productRepository.findByIdAndUsername(id,username)
                .orElseThrow(() -> new RuntimeException("Product not found or not owned by user"));

        productMapper.update(dto, product);
        Product updated = productRepository.save(product);

        return productMapper.entityToDto(updated);
    }

    //Everything is wrapped in a transaction using the Spring @Transactional, if everything succeeds -> transaction is committed and saved to the db
    //if transaction does not go threw -> undo changes
    @Override
    @Transactional
    public void deleteProduct(Long id, String username) {
        Product product = productRepository.findByIdAndUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Product not found or not owned by user"));
        productRepository.delete(product);
    }

    @Override
    public List<ProductDto> search(String username, String query) {
        return productRepository.findAllByUsernameAndName(username, query)
                .stream().map(productMapper::entityToDto)
                .toList();
    }

    @Override
    public int getTotalProductCount(){
        Long val = productRepository.totalProductCount();
       return (val==null)?0:val.intValue();
    }

public int getSearchedProductCount(String username, String name){
        Long val = productRepository.countAllByUsernameAndName( username,  name);
    return (val==null)?0:val.intValue();

}

}