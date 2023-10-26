package com.controllers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.services.ExpenseService;


import com.entities.Expense;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    //inject expense service here
    private final ExpenseService expenseService;
    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

    @Autowired
    public ExpenseController(ExpenseService expenseservice)
    {
        this.expenseService = expenseservice;
    }

    //get all the expenses
    @GetMapping("/")
    public ResponseEntity<List<Expense>> showAllExpenses()
    {
        logger.info("Fetching all expenses");
        List<Expense> expenses = this.expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    //add a new Expense
    @PostMapping("/")
    public ResponseEntity<Expense> addNewExpense(@RequestBody Expense expense)
    {
        logger.info("Adding new expense");
        Expense newExpense = this.expenseService.addNewExpense(expense);
        return ResponseEntity.ok(newExpense);
    }

    @PatchMapping("/{expenseId}")
    public ResponseEntity<Expense> editExpense(@PathVariable("expenseId") String id,  @RequestBody Map<String, Object> attributes)
    {
        try
        {
            Expense updatedExpense = this.expenseService.editExpense(id, attributes);
            logger.info("Expense edited successfully! ");
            return ResponseEntity.ok(updatedExpense);
        } 
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred!!", e);
        }
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable("expenseId") String id)
    {
        boolean deletionSuccessful = this.expenseService.deleteExpense(id);
        logger.info("Deletion of new expense is complete : " + deletionSuccessful);
        if(deletionSuccessful)
        {
            return ResponseEntity.ok("Expense was successfully deleted!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found");
    }
    
}
