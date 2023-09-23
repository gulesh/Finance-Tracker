package com.controllers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BasicController implements CommandLineRunner{
    
    @Override
    public void run(String... args) throws Exception
    {
        System.out.println("Hello!!!");
        System.out.flush();
    }
    
}
