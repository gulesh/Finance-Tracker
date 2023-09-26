package com.exceptionhandler;


public class MonthServiceException extends RuntimeException{
    
    public MonthServiceException(String message) {
        super(message);
    }

    public MonthServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
