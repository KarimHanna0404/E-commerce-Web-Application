package net.soulco.ecommerce.exception;

import net.soulco.ecommerce.exception.DuplicateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler{


    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<Map<String, Object>> DuplicateExceptionHandler(DuplicateException e){
        Map<String, Object> body =new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("Status", HttpStatus.CONFLICT.value());
        body.put("field",e.getField());
        body.put("error", "Duplicate Entry");
        body.put("message",e.getMessage());
        return new ResponseEntity<>(body,HttpStatus.CONFLICT);

    }

}
