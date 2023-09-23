package com.exceptionhandler;

public class AccountNotFound extends RuntimeException {
    public AccountNotFound(String name)
    {
        super("Account with the name - " + name + " - does not exists!");
    }
}
