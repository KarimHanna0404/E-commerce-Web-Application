package net.soulco.ecommerce.mapper;

import net.soulco.ecommerce.dto.ProductDto;
import net.soulco.ecommerce.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        uses = {}
)
public interface ProductMapper {

    ProductDto entityToDto(Product product);

    Product dtoToEntity(ProductDto productDto);

    void update(ProductDto productDto, @MappingTarget Product product);
}