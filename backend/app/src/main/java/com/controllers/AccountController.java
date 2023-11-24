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
import com.config.AuthUtils;
import com.entities.Account;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    //inject AccountService
    private final AccountService accountService;
    private final AuthUtils authUtils;
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    public AccountController(AccountService accountservice, AuthUtils authutils)
    {
        this.accountService = accountservice;
        this.authUtils = authutils;
    }
    //public ResponseEntity<List<Account>> showAllAccounts(@AuthenticationPrincipal Jwt jwt){ can access the sub inside now}

     // Get all accounts from the DB
     @GetMapping("/")
     @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
     public ResponseEntity<List<Account>> showAllAccounts(@RequestParam("userId") String encodedUserId) {
        logger.info("Fetching all accounts");
        String currentUser = this.authUtils.getCurrentUserId();
        logger.info("currUserId: " + currentUser);
        List<Account> userAccounts = this.accountService.getAllUserAccounts(currentUser);
        return ResponseEntity.ok(userAccounts);
     }

    // Add a new Account
    @PostMapping("/")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Account> addAccount(@RequestBody Account acct, @RequestParam("userId") String encodedUserId) {
        String currentUser = this.authUtils.getCurrentUserId();
        logger.info("currUserId: " + currentUser);
        Account newAccount = this.accountService.addNewAccount(acct, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
    }

    //get a specific account by name
    @GetMapping("/{accountName}")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Account> getAccountByAccountName(@PathVariable("accountName") String accountName, @RequestParam("userId") String encodedUserId) {
        try {
            String decodedAccountName = URLDecoder.decode(accountName, "UTF-8");
            String currentUser = this.authUtils.getCurrentUserId();
            logger.info("currUserId: " + currentUser);
            Account account = this.accountService.getAccountByNameAndUserId(decodedAccountName, currentUser);

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
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    ResponseEntity<Account> editAccount(@PathVariable("accountId") String id, @RequestBody Map<String, Object> attributes, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String currentUser = this.authUtils.getCurrentUserId();
            logger.info("currUserId: " + currentUser);
            Account updatedAccount = this.accountService.editAccount(id, attributes, currentUser);
            logger.info("Correctly edited the account");
            return ResponseEntity.ok(updatedAccount);
        }
        catch (Exception e) 
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred", e);
        }

    }
    
    @DeleteMapping("/{accountName}")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<String> deleteAccountByName(@PathVariable("accountName") String accountName, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String currentUser = this.authUtils.getCurrentUserId();
            logger.info("currUserId: " + currentUser);
            String decodedAccountName = URLDecoder.decode(accountName, "UTF-8");
            boolean deletionSuccessful = this.accountService.deleteAccount(decodedAccountName, currentUser);

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
