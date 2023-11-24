package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Account addNewAccount(Account account, String userId)
    {
        try
        {
            account.setUserID(userId);
            if (this.accountRepo.existsByNameAndUserId(account.getName(), userId)) {
                // Handle the case where a duplicate account exists
                throw new DuplicateAccount(account.getName());
            }
            return this.accountRepo.save(account);
        } 
        catch(Exception e)
        {
            // Handle other exceptions 
            throw new RuntimeException("Failed to add a new account", e);
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

    //modify existing Account
    public Account editAccount(String id, Map<String, Object> attributes, String userId)
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
                Account accountWithNewName = this.accountRepo.findByNameAndUserId(newName, userId);
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


    public boolean deleteAccount(String name, String userId)
    {
        boolean acctExists = this.accountRepo.existsByNameAndUserId(name, userId);
        if(!acctExists)
        {
            throw new AccountNotFound(name);
            
        } 
        this.accountRepo.deleteByNameAndUserId(name, userId);
        return true; //account successfully deleted
    }


}
