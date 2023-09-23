package com.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
}
