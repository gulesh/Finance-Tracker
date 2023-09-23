package com.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.services.AccountService;


import com.entities.Account;
import com.exceptionhandler.CategoryNotFound;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    //inject AccountService
    private final AccountService accountService;

    public AccountController(AccountService accountservice)
    {
        this.accountService = accountservice;
    }

     // Get all accounts from the DB
    @GetMapping("/")
    public ResponseEntity<List<Account>> showAllAccounts() {
        List<Account> accounts = this.accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    // Add a new Account
    @PostMapping("/")
    public ResponseEntity<Account> addAccount(@RequestBody Account acct) {
        Account newAccount = this.accountService.addNewAccount(acct);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
    }

    //get a specific account by name
    @GetMapping("/{accountName}")
    public ResponseEntity<Account> getAccountByAccountName(@PathVariable("accountName") String accountName) {
        try {
            String decodedAccountName = URLDecoder.decode(accountName, "UTF-8");
            Account account = this.accountService.getAccountByName(decodedAccountName);

            if (account != null) {
                return ResponseEntity.ok(account);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    //edit an existing account
    @PatchMapping("/{accountName}")
    ResponseEntity<Account> editAccount(@PathVariable("accountName") String accountName, @RequestBody Map<String, Object> attributes)
    {
        try
        {
            String decodedAccountName = URLDecoder.decode(accountName, "UTF-8");
            Account account = this.accountService.getAccountByName(decodedAccountName);
            if(account != null)
            {
                Account updatedAccount = this.accountService.editAccount(decodedAccountName, attributes);
                return ResponseEntity.ok(updatedAccount);
            } 
            else
            {
                throw new CategoryNotFound(decodedAccountName);
            }
            
        }
        catch (UnsupportedEncodingException e) 
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    
    @DeleteMapping("/{accountName}")
    public ResponseEntity<String> deleteAccountByName(@PathVariable("accountName") String accountName)
    {
        try
        {
            String decodedAccountName = URLDecoder.decode(accountName, "UTF-8");
            boolean deletionSuccessful = this.accountService.deleteAccount(decodedAccountName);

            if(deletionSuccessful)
            {
                return ResponseEntity.ok("Account was successfully deleted!");
            } 
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account with name - " + accountName + " - does not exists!");
            }
        } 
        catch(UnsupportedEncodingException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error decoding the account name!");
        }
        
    }
}
