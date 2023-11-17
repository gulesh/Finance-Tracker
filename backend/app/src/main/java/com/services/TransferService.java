package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entities.Account;
import com.entities.Transfer;
import com.exceptionhandler.AccountNotFound;
import com.exceptionhandler.TransferNotFound;
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

    @Transactional
    public Transfer addNewTransfer(Transfer transfer)
    {
        //check if the to and From accounts exists and get them
        String accountToName = transfer.getAccountTo().getName();
        String accountFromName = transfer.getAccountFrom().getName();
        
        if(!accountFromName.equals("adjust-balance") ) System.out.println("hi");
        Account acctTo = this.accountRepo.findByName(accountToName);
        Account acctFrom = this.accountRepo.findByName(accountFromName);
        
        if(acctTo == null)
        {
            throw new AccountNotFound(accountToName);
        }

        if(!accountFromName.equals("adjust-balance") && acctFrom == null)
        {
            throw new AccountNotFound(accountFromName);
        }

        //set the accounts to transfers
        transfer.setAccountTo(acctTo);
        if( !accountFromName.equals("adjust-balance") ) transfer.setAccountFrom(acctFrom);
        else{
            transfer.setAccountFrom(null);
        }

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
        if( !accountFromName.equals("adjust-balance") ) 
        {
            if(acctFrom.isDebt())
            {
                acctFrom.setAmount(acctFrom.getAmount() + savedTransfer.getAmount());
            }
            else 
            {
                acctFrom.setAmount(acctFrom.getAmount() - savedTransfer.getAmount());
            }

        }
        
        //save the changes to the db
       if( !accountFromName.equals("adjust-balance") )  this.accountRepo.save(acctFrom);
        this.accountRepo.save(acctTo);

        return savedTransfer;
    }

    public boolean deleteTransfer(String id)
    {
        Optional<Transfer> optionalTransfer = this.transferRepo.findById(id);
       if(optionalTransfer.isPresent())
       {
            this.transferRepo.deleteById(id);
            return true;
       }
       else {
            return false;
       }
    }

    @Transactional
    public Transfer editTransfer(String id, Map<String, Object> atgtributes)
    {
        Optional<Transfer> optionalExistingTransfer = this.transferRepo.findById(id);
        if(!optionalExistingTransfer.isPresent())
        {
            throw new TransferNotFound(id);
        }
        else 
        {
            Transfer existingTransfer = optionalExistingTransfer.get();
            //edit the transfer
            final double[] amt = { 0 }; // Using an array to simulate a mutable variable
            atgtributes.forEach((key, value) -> {
                switch (key) {
                    case "date":
                        if(value instanceof Date)
                        {
                            existingTransfer.setDate((Date) value);
                        }
                        break;
                    case "amount":
                        if(value instanceof Number)
                        {
                            amt[0] = ((Number) value).doubleValue() ;
                            existingTransfer.setAmount( amt[0] );
                        }
                        break;
                    case "accountTo":
                        if(value instanceof String)
                        {
                            Account newAccountTo = accountRepo.findByName( (String) value);
                            if(newAccountTo.isDebt())
                            {
                                newAccountTo.setAmount(newAccountTo.getAmount() - amt[0]); 
                            }
                            else
                            {
                               newAccountTo.setAmount(newAccountTo.getAmount() + amt[0]); 
                            }
                            //update the balance
                            existingTransfer.setAccountTo(newAccountTo);
                            this.accountRepo.save(newAccountTo);
                        }
                        break;
                    case "accountFrom":
                        if(value instanceof String)
                        {
                            String acctFrom = (String) value;
                            if( !acctFrom.equals("adjust-balance") )
                            {
                                Account newAccountFrom = accountRepo.findByName( (String) value);
                                newAccountFrom.setAmount(newAccountFrom.getAmount() - amt[0]);
                                existingTransfer.setAccountFrom(newAccountFrom);
                                this.accountRepo.save(newAccountFrom);
                            } 
                            else
                            {
                                existingTransfer.setAccountFrom(null);
                            }      
                        }
                        break;
                    case "description":
                        if(value instanceof String)
                        {
                            existingTransfer.setDescription((String) value);
                        }
                        break;   
                    default:
                        break;
                }
            });
            //save the new transfer
            this.transferRepo.save(existingTransfer);
            return existingTransfer;
        }

    }
    
}
