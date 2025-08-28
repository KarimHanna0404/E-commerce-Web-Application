package net.soulco.ecommerce.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.exception.DuplicateException;
import net.soulco.ecommerce.mapper.ProductMapper;
import net.soulco.ecommerce.mapper.UserMapper;
import net.soulco.ecommerce.model.Product;
import net.soulco.ecommerce.model.User;
import net.soulco.ecommerce.repo.OrderItemRepository;
import net.soulco.ecommerce.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final UserMapper userMapper;
    private final OrderItemRepository orderItemRepository;

    @Override
    public ProductDto createProduct(ProductDto dto, UserDto userDto) {
        // TODO: CHECK IF PRODUCT EXISTS THEN THROW CLEAR MESSAGE TO USER


        Product product = productMapper.dtoToEntity(dto);
        product.setUser(userMapper.dtoToEntity(userDto));
        String username = product.getUser().getUsername();
        if (!productRepository.findAllByUsernameAndName(username ,product.getName()).isEmpty()) {
           throw new DuplicateException("name","Item with that name already exists");
        }

        else if (productRepository.findProductByCode(product.getCode())!=null){
            throw new DuplicateException("code","Item with that Code already exists");

        }

else {
            Product saved = productRepository.save(product);
            return productMapper.entityToDto(saved);
        }
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return productMapper.entityToDto(product);
    }


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
        if(orderItemRepository.existsByProduct_Id(product.getId())) {
            throw new RuntimeException("Product cannot be deleted cause it was already ordered by user");
        }
        productRepository.delete(product);
    }

    @Override
    public List<ProductDto> search(String username, String query) {
        return productRepository.findAllByUsernameAndName(username, query)
                .stream().map(productMapper::entityToDto)
                .toList();
    }

    @Override
    public Long countByUsername(String username) {
        return productRepository.countAllByUsername(username);
    }
}