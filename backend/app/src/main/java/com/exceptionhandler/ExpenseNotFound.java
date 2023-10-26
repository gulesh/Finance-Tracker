package com.exceptionhandler;

public class ExpenseNotFound extends RuntimeException {
    public ExpenseNotFound(String id)
    {
        super("Account with the id - " + id + " - does not exists!");
    }
}
