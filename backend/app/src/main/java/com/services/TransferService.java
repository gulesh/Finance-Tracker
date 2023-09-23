package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.entities.Account;
import com.entities.Transfer;
import com.exceptionhandler.AccountNotFound;
import com.repositories.AccountRepository;
import com.repositories.TransferRepository;

@Service
public class TransferService {
    //inject repos here
    private final TransferRepository transferRepo;
    private final AccountRepository accountRepo;

    @Autowired
    public TransferService(TransferRepository transferrepo, AccountRepository accountrepo)
    {
        this.accountRepo = accountrepo;
        this.transferRepo = transferrepo;
    }

    //get all the transfers
    public List<Transfer> getAllTransfers()
    {
        return this.transferRepo.findAll();
    }

    //get transfers by AccountTo 
    public List<Transfer> getTransfersByAccountTo(String accountToName)
    {
        return this.transferRepo.findByAccountTo(accountToName);
    }

    //get transfers by AccountFrom 
    public List<Transfer> getTransfersByAccountFrom(String accountFromName)
    {
        return this.transferRepo.findByAccountFrom(accountFromName);
    }

    //get Transfers by date 
    public List<Transfer> getExpensesByMonth(String monthName)
    {
        Sort sortCriteria = Sort.by(Sort.Order.asc("date"));
        return this.transferRepo.findByMonth(monthName, sortCriteria);
    }

    public Transfer addNewTransfer(Transfer transfer)
    {
        //check if the to and From accounts exists and get them
        String accountToName = transfer.getAccountTo().getName();
        String accountFromName = transfer.getAccountFrom().getName();
        
        Account acctTo = this.accountRepo.findByName(accountToName);
        Account acctFrom = this.accountRepo.findByName(accountFromName);
        
        if(acctTo == null)
        {
            throw new AccountNotFound(accountToName);
        }

        if(acctFrom == null)
        {
            throw new AccountNotFound(accountFromName);
        }

        //set the accounts to transfers
        transfer.setAccountTo(acctTo);
        transfer.setAccountFrom(acctFrom);

        Transfer savedTransfer  = this.transferRepo.save(transfer);

       /* change account amounts */
        //check the account to
        if(acctTo.isDebt())
        {
           acctTo.setAmount(acctTo.getAmount() - savedTransfer.getAmount()); 
        } 
        else
        {
            acctTo.setAmount(acctTo.getAmount() + savedTransfer.getAmount());
        }

        //check account from
        if(acctFrom.isDebt())
        {
            acctFrom.setAmount(acctFrom.getAmount() + savedTransfer.getAmount());
        }
        else 
        {
            acctFrom.setAmount(acctFrom.getAmount() - savedTransfer.getAmount());
        }
        
        //save the changes to the db
        this.accountRepo.save(acctFrom);
        this.accountRepo.save(acctTo);

        return savedTransfer;
    }
    
}
