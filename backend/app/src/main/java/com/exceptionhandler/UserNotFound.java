package com.exceptionhandler;

public class UserNotFound extends RuntimeException{
    
    public UserNotFound(String name)
    {
        super("Could not find " + name);
    }
}
