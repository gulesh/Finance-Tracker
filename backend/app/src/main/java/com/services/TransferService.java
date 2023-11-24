package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.config.AuthUtils;
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
    private final AuthUtils authUtils;
    private static final Logger logger = LoggerFactory.getLogger(TransferService.class);

    @Autowired
    public TransferService(TransferRepository transferrepo, AccountRepository accountrepo, AuthUtils authutils)
    {
        this.accountRepo = accountrepo;
        this.transferRepo = transferrepo;
        this.authUtils = authutils;
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
        
        String currentUser = this.authUtils.getCurrentUserId();
        logger.info("currUserId: " + currentUser);

        Account acctTo = this.accountRepo.findByNameAndUserId(accountToName, currentUser);
        Account acctFrom = this.accountRepo.findByNameAndUserId(accountFromName, currentUser);
        
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

        //check account from. Can't transfer from a credit Account only To a credit account
        if( !accountFromName.equals("adjust-balance") ) 
        {
            
            acctFrom.setAmount(acctFrom.getAmount() - savedTransfer.getAmount());

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
            //reset the accounts values
            Transfer currTransfer = optionalTransfer.get();
            Account acctTo = currTransfer.getAccountTo();
            Account acctFrom = currTransfer.getAccountFrom();
            double amt = currTransfer.getAmount();
            
            //update acctTo
            if(acctTo.isDebt())
            {
                acctTo.setAmount(acctTo.getAmount() + amt);
            } 
            else 
            {
                acctTo.setAmount(acctTo.getAmount() - amt);
            }
            this.accountRepo.save(acctTo);

            //update acctFrom
            if(acctFrom != null)
            {
                acctFrom.setAmount(acctFrom.getAmount() + amt);
                this.accountRepo.save(acctFrom);
            }
            
            this.transferRepo.deleteById(id);
            return true;
       }
       else {
            return false;
       }
    }

    @Transactional
    public Transfer editTransfer(String id, Map<String, Object> attributes)
    {
        Optional<Transfer> optionalExistingTransfer = this.transferRepo.findById(id);
        String currentUser = this.authUtils.getCurrentUserId();
        logger.info("currUserId: " + currentUser);
        if(!optionalExistingTransfer.isPresent())
        {
            throw new TransferNotFound(id);
        }
        else 
        {
            Transfer existingTransfer = optionalExistingTransfer.get();
            //edit the transfer
            final double[] amtNew = { 0 }; // Using an array to simulate a mutable variable
            final double[] amtPrev = { existingTransfer.getAmount() };
            if (attributes.containsKey("amount")) {
                amtNew[0] = ((Number) attributes.get("amount")).doubleValue();
            } else {
                amtNew[0] = existingTransfer.getAmount();
            }

            attributes.forEach((key, value) -> {
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
                            //AccountTo not changed then adjust the balance
                            if(!attributes.containsKey("accountTo"))
                            {
                                Account currAccount = existingTransfer.getAccountTo();
                                if(currAccount.isDebt())
                                {
                                    currAccount.setAmount(currAccount.getAmount() + amtPrev[0] - amtNew[0]);
                                }
                                else {
                                    currAccount.setAmount(currAccount.getAmount() - amtPrev[0] + amtNew[0]);
                                }
                                this.accountRepo.save(currAccount);  
                            }

                            //check the accountFrom
                            Account currAccount = existingTransfer.getAccountFrom();
                            if(currAccount != null)
                            {
                                currAccount.setAmount(currAccount.getAmount() + amtPrev[0] - amtNew[0]);
                                this.accountRepo.save(currAccount);
                            }
                            existingTransfer.setAmount( amtNew[0] );
                        }
                        break;
                    case "accountTo":
                        if (value instanceof Map)
                        {
                            Map<?, ?> catMap = (Map<?, ?>) value;
                            Object nameValue = catMap.get("name");

                            if (nameValue != null) {
                                String name = nameValue.toString();

                                //update the previously assigned account
                                Account prevAccount = existingTransfer.getAccountTo();
                                if(prevAccount.isDebt())
                                {
                                    prevAccount.setAmount(prevAccount.getAmount() - amtPrev[0]); 
                                }
                                else
                                {
                                    prevAccount.setAmount(prevAccount.getAmount() + amtPrev[0]); 
                                }

                                //update the new account balance
                                Account newAccountTo = accountRepo.findByNameAndUserId( name , currentUser);
                                if(newAccountTo.isDebt())
                                {
                                    newAccountTo.setAmount(newAccountTo.getAmount() - amtNew[0]); 
                                }
                                else
                                {
                                    newAccountTo.setAmount(newAccountTo.getAmount() + amtNew[0]); 
                                }
                                //update the balance
                                existingTransfer.setAccountTo(newAccountTo);
                                this.accountRepo.save(prevAccount);
                                this.accountRepo.save(newAccountTo);
                            }
                            else {
                                logger.info("Value for AccountTo key 'name' is null");
                            }
                        }
                        else {
                            logger.info("Not a Map for key AccountTo");
                        }
                        break;
                    case "accountFrom":
                        if (value instanceof Map)
                        {
                            Map<?, ?> catMap = (Map<?, ?>) value;
                            Object nameValue = catMap.get("name");

                            if (nameValue != null) {
                                String name = nameValue.toString();

                                Account prevAccount = existingTransfer.getAccountFrom();
                                if(prevAccount != null)
                                {
                                    prevAccount.setAmount(prevAccount.getAmount() + amtPrev[0]);
                                    this.accountRepo.save(prevAccount);
                                }

                                //update new AcconutFrom
                                if( !name.equals("adjust-balance") )
                                {
                                    Account newAccountFrom = accountRepo.findByNameAndUserId( name, currentUser );
                                    newAccountFrom.setAmount(newAccountFrom.getAmount() - amtNew[0]);
                                    existingTransfer.setAccountFrom(newAccountFrom);
                                    this.accountRepo.save(newAccountFrom);
                                } 
                                else
                                {
                                    existingTransfer.setAccountFrom(null);
                                }      
                            }
                            else {
                                logger.info("Value for AccountFrom key 'name' is null");
                            }   
                        }
                        else {
                            logger.info("Not a Map for key AccountFrom");
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
