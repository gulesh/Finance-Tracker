package com.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.repositories.AccountRepository;

import com.entities.Account;
import com.exceptionhandler.AccountNotFound;
import com.exceptionhandler.DuplicateAccount;

@Service
public class AccountService {
    //inject account repo here
    private final AccountRepository accountRepo;

    @Autowired
    public AccountService(AccountRepository accountrepo)
    {

        this.accountRepo = accountrepo;
    }

    public List<Account> getAllAccounts()
    {
        return this.accountRepo.findAll();
    }

    public List<Account> getAllUserAccounts(String userId)
    {
        return this.accountRepo.findByUserId(userId);
    }

    public List<Account> getAllActiveAccountsForTheUser(String userId)
    {
        return this.accountRepo.findByUserIdAndIsDeleted(userId, false);
    }

    public List<Account> getAllUserAccountsForTheMonth(String userId, boolean isDeleted, LocalDateTime start, LocalDateTime end)
    {
        return this.accountRepo.findByUserIdAndIsDeletedAndCreatedAtBetween(userId, isDeleted, start, end);
    }

    public Account addNewAccount(Account account, String userId)
    {
        try
        {
            account.setUserId(userId);
            LocalDateTime now = LocalDateTime.now();
            account.setCreatedAt(now);
            if (this.accountRepo.existsByNameAndUserIdAndIsDeleted(account.getName(), userId, false) ) {
                // Handle the case where a duplicate account exists
                throw new DuplicateAccount(account.getName());
            }
            return this.accountRepo.save(account);
        } 
        catch(Exception e)
        {
            // Handle other exceptions 
            throw new RuntimeException("Failed to add the new account", e);
        }
       
    }

    public Account getAccountByNameAndUserId(String name, String userId)
    {
        try
        {
            return this.accountRepo.findByNameAndUserId(name, userId);
        }
        catch (Exception e)
        {
            throw new AccountNotFound(name);
        }
    }

    public Account getCategoryById(String id) throws Exception
    {
        Optional<Account> optionalAccount = this.accountRepo.findById(id);
        if(optionalAccount.isPresent())
        {
            return optionalAccount.get();
        } 
        else
        {
            throw new AccountNotFound(id); 
        }
    }

    //modify existing Account
    @Transactional
    public Account editAccount(String id, Map<String, Object> attributes, String userId) throws Exception
    {
        Optional<Account> optionalExistingAccount = this.accountRepo.findById(id);
        if(!optionalExistingAccount.isPresent())
        {
            throw new AccountNotFound("Id: " + id);
        }
        else 
        {
            Account existingAccount = optionalExistingAccount.get();
            String newName = (String) attributes.get("name");
            if(newName != null && !newName.equals(existingAccount.getName()))
            {
                Account accountWithNewName = this.accountRepo.findByNameAndUserIdAndIsDeleted(newName, userId, false);
                if(accountWithNewName != null)
                {
                    throw new DuplicateAccount(newName);
                }
            }
            //edit the ACCOUNT
            attributes.forEach((key, value) ->
            {
                switch (key) {
                    case "name": 
                        if (value instanceof String) {
                            existingAccount.setName((String) value);
                        }
                        break;
                    case "amount":
                        if (value instanceof Number) {
                            // Convert to double and set
                            existingAccount.setAmount(((Number) value).doubleValue());
                        }
                        break;
                    case "debt": 
                        if(value instanceof Boolean )
                        {
                            existingAccount.setDebt((boolean) value);

                        }
                        break;
                    default:
                        break;
                }
            });
            this.accountRepo.save(existingAccount);
            return existingAccount;

        }     
    }

    @Transactional
    public boolean deleteAccount(String name, String userId)
    {
        //boolean acctExists = this.accountRepo.existsByNameAndUserId(name, userId);
        Account acctExists = this.accountRepo.findByNameAndUserIdAndIsDeleted(name, userId, false);
        if(acctExists == null)
        {
            throw new AccountNotFound(name);
            
        } 
        //this.accountRepo.deleteByNameAndUserId(name, userId); //Hard delete
        acctExists.setDeleted(true); //soft delete
        this.accountRepo.save(acctExists);
        return true; //account successfully deleted
    }


}
