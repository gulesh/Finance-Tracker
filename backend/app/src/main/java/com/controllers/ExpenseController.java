package com.controllers;

import java.util.List;
import java.util.Map;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<List<Expense>> showAllExpenses(@RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            logger.info("Fetching all expenses");
            List<Expense> expenses = this.expenseService.getCurrrentMonthExpensesForTheUser(decodedUserId);
            return ResponseEntity.ok(expenses);
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        
    }

    //add a new Expense
    @PostMapping("/")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Expense> addNewExpense(@RequestBody Expense expense, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            logger.info("Adding new expense");
            Expense newExpense = this.expenseService.addNewExpense(expense, decodedUserId);
            return ResponseEntity.ok(newExpense);
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        
    }

    @PatchMapping("/{expenseId}")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Expense> editExpense(@PathVariable("expenseId") String id,  @RequestBody Map<String, Object> attributes, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            Expense updatedExpense = this.expenseService.editExpense(id, attributes, decodedUserId);
            logger.info("Expense edited successfully! ");
            return ResponseEntity.ok(updatedExpense);
        } 
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error editing expense ", e);
        }
    }

    @DeleteMapping("/{expenseId}")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<String> deleteExpense(@PathVariable("expenseId") String id, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            boolean deletionSuccessful = this.expenseService.deleteExpense(id, decodedUserId);
            logger.info("Deletion of expense is complete : " + deletionSuccessful);
            if(deletionSuccessful)
            {
                return ResponseEntity.ok("Expense was successfully deleted!");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting expense: " + e.toString());
        }
        
    }
    
}
