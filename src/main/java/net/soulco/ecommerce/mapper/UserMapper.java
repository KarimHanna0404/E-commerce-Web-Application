package net.soulco.ecommerce.mapper;

import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        uses = {}
)
public interface UserMapper {

    UserDto entityToDto(User user);

    User dtoToEntity(UserDto user);
}
