package net.soulco.ecommerce.exception;

public class DuplicateException extends RuntimeException {
    private String field;
    public DuplicateException(String message, String field ) {
        super(message);
        this.field=field;
    }
    public String getField(){
        return field;
    }
}
