package net.soulco.ecommerce.exception;

public class DuplicateException extends RuntimeException {
    private String field;
    public DuplicateException( String field ,String message  ) {
        super(message);
        this.field=field;
    }
    public String getField(){
        return field;
    }
}
