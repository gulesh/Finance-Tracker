package com.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.services.AccountService;


import com.entities.Account;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    //inject AccountService
    private final AccountService accountService;
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    public AccountController(AccountService accountservice)
    {
        this.accountService = accountservice;
    }
    //public ResponseEntity<List<Account>> showAllAccounts(@AuthenticationPrincipal Jwt jwt){ can access the sub inside now}

     // Get all accounts from the DB
     @GetMapping("/")
     @PreAuthorize("#decodedUserId == authentication.principal.claims['sub']")
     public ResponseEntity<List<Account>> showAllAccounts(@RequestParam("userId") String encodedUserId) {
        logger.info("Fetching all accounts");
        // Decode the URL-encoded userId
        String decodedUserId = null;
        try {
            decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // Handle the exception (e.g., log it)
            e.printStackTrace();
        }
        logger.info("userID: " + decodedUserId);
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
    @PatchMapping("/{accountId}")
    ResponseEntity<Account> editAccount(@PathVariable("accountId") String id, @RequestBody Map<String, Object> attributes)
    {
        try
        {
            Account updatedAccount = this.accountService.editAccount(id, attributes);
            logger.info("Correctly edited the account");
            return ResponseEntity.ok(updatedAccount);
        }
        catch (Exception e) 
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred", e);
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
