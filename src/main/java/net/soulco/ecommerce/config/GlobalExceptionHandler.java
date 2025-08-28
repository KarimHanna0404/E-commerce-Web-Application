package net.soulco.ecommerce.config;

import net.soulco.ecommerce.dto.BusinessExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;



@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(BusinessException.class)
//    public ResponseEntity<BusinessExceptionDto> handleBusinessExceptions(final Exception exception, final WebRequest request) {
//        return new ResponseEntity<>(new BusinessExceptionDto(exception.getMessage()), HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BusinessExceptionDto> handleRuntimeExceptions(final Exception exception, final WebRequest request) {
        return new ResponseEntity<>(new BusinessExceptionDto(exception.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<BusinessExceptionDto> handleNullPointerException(NullPointerException ex) {
        return new ResponseEntity<>(new BusinessExceptionDto("General Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BusinessExceptionDto> handleAllUncaughtExceptions(Exception exception) {
        return new ResponseEntity<>(new BusinessExceptionDto("General Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


