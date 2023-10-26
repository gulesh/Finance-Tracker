package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
        account.setAmount(account.getAmount() - savedExpense.getAmount());
        this.accountRepo.save(account); //save the account with updates

        return savedExpense;

    }

    public Expense editExpense(String id, Map<String, Object> attributes) {
        Optional<Expense> optionalExistingExpense = this.expenseRepo.findById(id);
        if (!optionalExistingExpense.isPresent()) {
            throw new ExpenseNotFound(id);
        } else {

            Expense existingExpense = optionalExistingExpense.get();
            System.out.println(existingExpense.getAmount());

            // Edit the Expense
            attributes.forEach((key, value) -> {
                switch (key) {
                    case "category":
                        if (value instanceof String) {
                            Category newAssignedCategory = categoryRepo.findByName((String) value);
                            existingExpense.setCategory(newAssignedCategory);
                        }
                        break;
                    case "account":
                        if (value instanceof String) {
                            Account newAssignedAccount = accountRepo.findByName((String) value);
                            existingExpense.setAccount(newAssignedAccount);
                        }
                        break;
                    case "details":
                        if (value instanceof String) {
                            existingExpense.setDetails((String) value);
                        }
                        break;
                    case "amount":
                        if (value instanceof Number) {
                            // Convert to double and set
                            existingExpense.setAmount(((Number) value).doubleValue());
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

            this.expenseRepo.save(existingExpense);
            return existingExpense;
        }
    }

    public boolean deleteExpense(String id)
    {
        Optional<Expense> optionalExpense = this.expenseRepo.findById(id);
        if(optionalExpense.isPresent())
        {
            this.expenseRepo.deleteById(id);
            return true;
        } 
        else
        {
            return false;
        }


    }
}
