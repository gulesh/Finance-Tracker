package com.exceptionhandler;

public class DuplicateCategory extends RuntimeException {
    public DuplicateCategory(String name)
    {
        super("Category name - " + name + " - already exists!");
    }
}
