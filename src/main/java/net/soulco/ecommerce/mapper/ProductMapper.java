package net.soulco.ecommerce.mapper;

import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.model.Product;
import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        uses = {}
)
public interface ProductMapper {

    ProductDto entityToDto(Product product);

    Product dtoToEntity(ProductDto productDto);

    @BeanMapping(nullValuePropertyMappingStrategy =  NullValuePropertyMappingStrategy.IGNORE)
    void update(ProductDto productDto, @MappingTarget Product product);

    void delete(ProductDto productDto, @MappingTarget Product product);
}