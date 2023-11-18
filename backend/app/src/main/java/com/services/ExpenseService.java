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

import com.repositories.AccountRepository;
import com.repositories.CategoryRepository;
import com.repositories.ExpenseRepository;
import com.entities.Account;
import com.entities.Category;
import com.entities.Expense;
import com.exceptionhandler.AccountNotFound;
import com.exceptionhandler.CategoryNotFound;
import com.exceptionhandler.ExpenseNotFound;

@Service
public class ExpenseService {
    //inject expense repo
    private final ExpenseRepository expenseRepo;
    private final CategoryRepository categoryRepo;
    private final AccountRepository accountRepo;
    private static final Logger logger = LoggerFactory.getLogger(ExpenseService.class);


    @Autowired
    public ExpenseService(ExpenseRepository expenserepo, CategoryRepository categoryrepo, AccountRepository accountrepo )
    {
        this.expenseRepo = expenserepo;
        this.categoryRepo = categoryrepo;
        this.accountRepo = accountrepo;
    }

    //get the expenses by category name
    public List<Expense> getAllExpenses()
    {
        return this.expenseRepo.findAll();
    }

    //get expenses by Category
    public List<Expense> getExpensesByCategory(String categoryName)
    {
        return this.expenseRepo.findByCategory_Name(categoryName);
    }

    //get expenses by date
    public List<Expense> getExpensesByMonth(String monthName)
    {
        Sort sortCriteria = Sort.by(Sort.Order.asc("date"));
        return this.expenseRepo.findByMonth(monthName, sortCriteria);
    }

    @Transactional
    public Expense addNewExpense(Expense expense)
    {
        String categoryName = expense.getCategory().getName();
        String accountName = expense.getAccount().getName();
        // check if the category and account exists
        Category category = categoryRepo.findByName(categoryName);
        Account account = accountRepo.findByName(accountName);
        //check if the account name exists
        if(account == null)
        {
            throw new AccountNotFound(accountName);
        }
        //check if categry name exist
        if(category == null)
        {
            throw new CategoryNotFound(categoryName);
        }
        //set the category and account name
        expense.setAccount(account);
        expense.setCategory(category);

        Expense savedExpense = this.expenseRepo.save(expense); //saved the expense

        //edit the account balance now
        logger.info(account.toString());
        if(account.isDebt())
        {
            account.setAmount(account.getAmount() + savedExpense.getAmount());
        } 
        else 
        {
            account.setAmount(account.getAmount() - savedExpense.getAmount());
        }
        this.accountRepo.save(account); //save the account with updates

        //update the category amount spent
        category.setAmountSpent(category.getAmountSpent() + savedExpense.getAmount());
        this.categoryRepo.save(category);

        return savedExpense;
    }

    @Transactional
    public Expense editExpense(String id, Map<String, Object> attributes) {
        Optional<Expense> optionalExistingExpense = this.expenseRepo.findById(id);
        if (!optionalExistingExpense.isPresent()) {
            throw new ExpenseNotFound(id);
        } else {

            Expense existingExpense = optionalExistingExpense.get();

            // Need amount before switch so that can appropriately update category and account
            final double[] newAmt = {0};
            final double[] prevAmt = { existingExpense.getAmount() };
            if(attributes.containsKey("amount"))
            {
                newAmt[0] = ((Number) attributes.get("amount")).doubleValue();
            }  else 
            {
                newAmt[0] = existingExpense.getAmount();
            }
            //update all the attributes
            attributes.forEach((key, value) -> {
                switch (key) {
                    case "category":
                        if (value instanceof Map) {
                            Map<?, ?> catMap = (Map<?, ?>) value;
                            Object nameValue = catMap.get("name");

                            if (nameValue != null) {
                                
                                String name = nameValue.toString();
                                logger.info("Name: " + name);
                                
                                Category prevCat = existingExpense.getCategory();
                                prevCat.setAmountSpent(prevCat.getAmountSpent() - prevAmt[0]); 
                                
                                //update the new category
                                Category newAssignedCategory = categoryRepo.findByName(name);
                                newAssignedCategory.setAmountSpent(newAssignedCategory.getAmountSpent() + newAmt[0]);
                                
                                //save
                                this.categoryRepo.save(prevCat);
                                this.categoryRepo.save(newAssignedCategory);
                                
                                existingExpense.setCategory(newAssignedCategory);
                                
                            } else {
                                logger.info("Value for Category key 'name' is null");
                            }
                        } else {
                            logger.info("Not a Map for key category");
                        }
                        break;
                    case "account":
                        if (value instanceof Map) {
                            Map<?, ?> acctMap = (Map<?, ?>) value;
                            Object nameValue = acctMap.get("name");

                            if (nameValue != null) {
                                String name = nameValue.toString();
                                logger.info("Name: " + name);
                                
                                //update prevAcct to previous state
                                Account prevAcct = existingExpense.getAccount();
                                if(prevAcct.isDebt())
                                {
                                    prevAcct.setAmount(prevAcct.getAmount() - prevAmt[0]);
                                } 
                                else 
                                {
                                    prevAcct.setAmount(prevAcct.getAmount() + prevAmt[0]);
                                }
                                
                                //uupdate the new account balance
                                Account newAssignedAccount = accountRepo.findByName(name);
                                if(newAssignedAccount.isDebt())
                                {
                                    newAssignedAccount.setAmount(newAssignedAccount.getAmount() + newAmt[0]);
                                } 
                                else 
                                {
                                    newAssignedAccount.setAmount(newAssignedAccount.getAmount() - newAmt[0]);
                                }
                                //save
                                this.accountRepo.save(prevAcct);
                                this.accountRepo.save(newAssignedAccount);
                                
                                existingExpense.setAccount(newAssignedAccount);
                            } 
                            else {
                                logger.info("Value for Account key 'name' is null");
                            }
                        } else {
                            logger.info("Not a Map for key Account");
                        }
                        break;
                    case "details":
                        if (value instanceof String) {
                            existingExpense.setDetails((String) value);
                        }
                        break;
                    case "amount":
                        if (value instanceof Number) {
                            //category not changed
                            if(!attributes.containsKey("category"))
                            {
                                Category currCat = existingExpense.getCategory();
                                currCat.setAmountSpent(currCat.getAmountSpent() - prevAmt[0] + newAmt[0]);
                                this.categoryRepo.save(currCat);
                            }
                            //account not changed
                            if(!attributes.containsKey("account"))
                            {
                                Account currAcct = existingExpense.getAccount();
                                if(currAcct.isDebt())
                                {
                                    currAcct.setAmount(currAcct.getAmount() - prevAmt[0] + newAmt[0]);
                                }
                                else 
                                {
                                    currAcct.setAmount(currAcct.getAmount() + prevAmt[0] - newAmt[0]);
                                }
                                this.accountRepo.save(currAcct);  
                            }
                            existingExpense.setAmount(newAmt[0]);
                        }
                        break;
                    case "date":
                        if (value instanceof Date) {
                            existingExpense.setDate((Date) value);
                        }
                        break;
                    case "description":
                        if (value instanceof String) {
                            existingExpense.setDescription((String) value);
                        }
                        break;
                    default:
                        break;
                }
            });
            //save expense
            this.expenseRepo.save(existingExpense);
            return existingExpense;
        }
    }

    @Transactional
    public boolean deleteExpense(String id)
    {
        Optional<Expense> optionalExpense = this.expenseRepo.findById(id);
        if(optionalExpense.isPresent())
        {
            //update the category and account
            Expense expense = optionalExpense.get();
            double amt = expense.getAmount();
            Account acct = expense.getAccount();
            Category cat = expense.getCategory();
            //update the account balance
            if(acct.isDebt())
            {
                acct.setAmount(acct.getAmount() - amt);
            } 
            else 
            {
                acct.setAmount(acct.getAmount() + amt);
            }
            //update the soent amount for the category
            cat.setAmountSpent(cat.getAmountSpent() - amt);
            this.accountRepo.save(acct);
            this.categoryRepo.save(cat);
            this.expenseRepo.deleteById(id);
            return true;
        } 
        else
        {
            return false;
        }

    }
}
