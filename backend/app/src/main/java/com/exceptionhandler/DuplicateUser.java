package com.exceptionhandler;

public class DuplicateUser extends RuntimeException {
    public DuplicateUser(String name)
    {
        super("User already exists: " + name);
    }
}
