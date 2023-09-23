package com.exceptionhandler;

public class CategoryNotFound extends RuntimeException {
    public CategoryNotFound(String name)
    {
        super("Category with the name - " + name + " - does not exists!");
    }
}
