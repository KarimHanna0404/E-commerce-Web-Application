package net.soulco.ecommerce.exception;

public class BusinessException extends RuntimeException {
    protected String message;


    public BusinessException(final String message) {
        super(message);
        this.message = message;
    }

    public BusinessException(final Exception exception) {
        super(exception);
    }

    public BusinessException(final String message, final Throwable cause) {
        super(message, cause);
        this.message = message;
    }
}
