package com.exceptionhandler;

public class TransferNotFound extends RuntimeException {
    public TransferNotFound(String id)
    {
        super("Transfer id - " + id + " - dopes not exists!");
    }  
}
