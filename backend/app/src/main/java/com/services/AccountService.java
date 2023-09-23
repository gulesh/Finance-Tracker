package com.services;

import java.util.List;
import java.util.Map;

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

    //modigy existing Account
    public Account editAccount(String name, Map<String, Object> attributes)
    {
        Account existingAccount = this.accountRepo.findByName(name);
        if(existingAccount == null)
        {
            throw new AccountNotFound(name);
        } 
        else
        {
            String newName = (String) attributes.get("name");
            if(newName != null && !newName.equals(name))
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
                        existingAccount.setName((String) value);
                        break;
                    case "amount": 
                        existingAccount.setAmount((Integer) value);
                        break;
                    case "debt": 
                        existingAccount.setDebt((boolean) value);
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
