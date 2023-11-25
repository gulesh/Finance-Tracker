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

    //get expenses for the user by Category
    public List<Expense> getExpensesByCategoryForTheUser(String userId, String categoryName)
    {
        return this.expenseRepo.findByUserIdAndCategory_Name(userId, categoryName);
    }

    //get expenses for current month
    public List<Expense> getAllCurrrentMonthExpensesForTheUser(String userId)
    {
        Sort sortCriteria = Sort.by(Sort.Order.asc("date"));
        LocalDate currentDate = LocalDate.now();
        int month = currentDate.getMonthValue();
        int year = currentDate.getYear();
        String monthString = String.format("%04d-%02d.*", year, month);
        return this.expenseRepo.findByUserIdAndMonth(userId, monthString, sortCriteria);
    }

    //get the active expenses (isDeleted == false)
    public List<Expense> getCurrrentMonthExpensesForTheUser(String userId)
    {
        LocalDate currentDate = LocalDate.now();  
        LocalDate firstDayOfMonth = currentDate.withDayOfMonth(1);
        LocalDate lastdayOfMonth = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        return this.expenseRepo.findByUserIdAndIsDeletedAndDateBetween(userId, false, firstDayOfMonth, lastdayOfMonth);
    }

    @Transactional
    public Expense addNewExpense(Expense expense, String userId)
    {
        try
        {
            String categoryName = expense.getCategory().getName();
            String accountName = expense.getAccount().getName();
            // check if the category and account exists
            Category category = categoryRepo.findByNameAndUserId(categoryName, userId);
            Account account = accountRepo.findByNameAndUserId(accountName, userId);
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
            expense.setDeleted(false);
            expense.setUserId(userId);

            Expense savedExpense = this.expenseRepo.save(expense); //saved the expense

            //edit the account balance now
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
        catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("Failed to add the new expense", e);
        }
        
    }

    @Transactional
    public Expense editExpense(String id, Map<String, Object> attributes, String userId) throws Exception
    {
        Optional<Expense> optionalExistingExpense = this.expenseRepo.findById(id);
        if (!optionalExistingExpense.isPresent()) {
            throw new ExpenseNotFound(id);
        } else {

            Expense existingExpense = optionalExistingExpense.get();

            //if this check is not done two user my edit the same data and cause concurrency issue
            if(!userId.equals(existingExpense.getUserId())) throw  new Exception("Ivalid operation as userIds are different");

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
                                Category newAssignedCategory = categoryRepo.findByNameAndUserId(name, userId);
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
                                Account newAssignedAccount = accountRepo.findByNameAndUserId(name, userId);
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
                        if (value instanceof LocalDate) {
                            existingExpense.setDate((LocalDate) value);
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
    public boolean deleteExpense(String id, String userId) throws Exception
    {
        Optional<Expense> optionalExpense = this.expenseRepo.findById(id);
        if(optionalExpense.isPresent())
        {
            //update the category and account
            Expense expense = optionalExpense.get();
            //if this check is not done two user my edit the same data and cause concurrency issue
            if(!userId.equals(expense.getUserId())) throw  new Exception("Ivalid operation as userIds are different");
            
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
            //update the spent amount for the category
            cat.setAmountSpent(cat.getAmountSpent() - amt);
            this.accountRepo.save(acct);
            this.categoryRepo.save(cat);
            //this.expenseRepo.deleteById(id); not hard delete 
            expense.setDeleted(true); //soft delete
            this.expenseRepo.save(expense);
            return true;
        } 
        else
        {
            return false;
        }

    }
}
