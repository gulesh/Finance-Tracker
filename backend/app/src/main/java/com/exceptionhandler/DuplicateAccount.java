package com.exceptionhandler;


public class DuplicateAccount extends RuntimeException{
    public DuplicateAccount(String name)
    {
        super("Account name - " + name  +" - already exists!");
    }
}
