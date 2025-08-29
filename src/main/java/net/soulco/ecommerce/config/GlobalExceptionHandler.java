package net.soulco.ecommerce.config;

import net.soulco.ecommerce.dto.BusinessExceptionDto;
import net.soulco.ecommerce.exception.DuplicateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(BusinessException.class)
//    public ResponseEntity<BusinessExceptionDto> handleBusinessExceptions(final Exception exception, final WebRequest request) {
//        return new ResponseEntity<>(new BusinessExceptionDto(exception.getMessage()), HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler({DuplicateException.class})
    public ResponseEntity<Map<String, Object>> DuplicateExceptionHandler(DuplicateException e) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("Status", HttpStatus.CONFLICT.value());
        body.put("field", e.getField());
        body.put("error", "Duplicate Entry");
        body.put("message", e.getMessage());
        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

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


