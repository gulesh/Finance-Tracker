package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(TransferService.class);

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

    public List<Transfer> getTransferByAccountToForTheUser(String accountTo, String userId)
    {
        return this.transferRepo.findByAccountToAndUserId(accountTo, userId);
    }

    public List<Transfer> getTransferByAccountFromForTheUser(String accountFrom, String userId)
    {
        return this.transferRepo.findByAccountFromAndUserId(accountFrom, userId);
    }

    //get all Transfers for the current Month 
    public List<Transfer> getAllCurrrentMonthTransfersForTheUser(String userId, String monthName)
    {
        Sort sortCriteria = Sort.by(Sort.Order.asc("date"));
        LocalDate currentDate = LocalDate.now();
        int month = currentDate.getMonthValue();
        int year = currentDate.getYear();
        String monthString = String.format("%04d-%02d.*", year, month);
        return this.transferRepo.findByUserIdAndMonth(userId, monthString, sortCriteria);
    }

    //get the active Transfers (isDeleted == false)
    public List<Transfer> getCurrrentMonthActiveTransfersForTheUser(String userId)
    {
        LocalDate currentDate = LocalDate.now();  
        LocalDate firstDayOfMonth = currentDate.withDayOfMonth(1);
        LocalDate lastdayOfMonth = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        return this.transferRepo.findByUserIdAndIsDeletedAndDateBetween(userId, false, firstDayOfMonth, lastdayOfMonth);
    }

    public Transfer saveTransfer(Transfer transfer)
    {
        return this.transferRepo.save(transfer);
    }

    public List<Transfer> saveAllTransfers(List<Transfer> transfers) {
        try {
            return this.transferRepo.saveAll(transfers);
        } catch (Exception e) {
            // Handle the exception (log, rethrow, etc.)
            throw new RuntimeException("Error saving transfers", e);
        }
    }

    @Transactional
    public Transfer addNewTransfer(Transfer transfer, String userId)
    {
        //check if the to and From accounts exists and get them
        String accountToName = transfer.getAccountTo().getName();
        String accountFromName = transfer.getAccountFrom().getName();
        
        Account acctTo = this.accountRepo.findByNameAndUserId(accountToName, userId);
        Account acctFrom = this.accountRepo.findByNameAndUserId(accountFromName, userId);
        
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

        transfer.setDeleted(false);
        transfer.setUserId(userId);
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

    @Transactional
    public boolean deleteTransfer(String id, String userId) throws Exception
    {
        Optional<Transfer> optionalTransfer = this.transferRepo.findById(id);
       if(optionalTransfer.isPresent())
       {
            //reset the accounts values
            Transfer transfer = optionalTransfer.get();
            // if this check is not done two user my edit the same data and cause concurrency issue
            if (!userId.equals(transfer.getUserId())) throw new Exception("Ivalid operation as userIds are different");
            Account acctTo = transfer.getAccountTo();
            Account acctFrom = transfer.getAccountFrom();
            double amt = transfer.getAmount();
            
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
            
            //this.transferRepo.deleteById(id); //hard delete
            transfer.setDeleted(true); //soft delete
            this.transferRepo.save(transfer);
            return true;
       }
       else {
            return false;
       }
    }

    @Transactional
    public Transfer editTransfer(String id, Map<String, Object> attributes, String userId) throws Exception
    {
        Optional<Transfer> optionalExistingTransfer = this.transferRepo.findById(id);
        if(!optionalExistingTransfer.isPresent())
        {
            throw new TransferNotFound(id);
        }
        else 
        {
            Transfer existingTransfer = optionalExistingTransfer.get();
            // if this check is not done two user my edit the same data and cause concurrency issue
            if (!userId.equals(existingTransfer.getUserId())) throw new Exception("Ivalid operation as userIds are different");
            
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
                        if(value instanceof LocalDate)
                        {
                            existingTransfer.setDate((LocalDate) value);
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
                                Account newAccountTo = accountRepo.findByNameAndUserId( name , userId);
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
                                    Account newAccountFrom = accountRepo.findByNameAndUserId( name, userId );
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
