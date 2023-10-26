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

    public Account addNewAccount(Account account)
    {
        try
        {
            return this.accountRepo.save(account);
        } 
        catch(Exception e)
        {
            throw new DuplicateAccount(account.getName());
        }
       
    }

    public Account getAccountByName(String name)
    {
        try
        {
            return this.accountRepo.findByName(name);
        }
        catch (Exception e)
        {
            throw new AccountNotFound(name);
        }
    }

    //modify existing Account
    public Account editAccount(String id, Map<String, Object> attributes)
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
                Account accountWithNewName = this.accountRepo.findByName(newName);
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


    public boolean deleteAccount(String name)
    {
        Account acct = this.accountRepo.findByName(name);
        if(acct == null)
        {
            throw new AccountNotFound(name);
            
        } 
        this.accountRepo.deleteByName(name);
        return true; //account successfully deleted
    }


}
