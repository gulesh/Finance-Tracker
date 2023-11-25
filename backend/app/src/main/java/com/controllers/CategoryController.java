package com.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Map;

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

import com.services.CategoryService;
import com.entities.Category;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    //inject CategoryService here
    private final CategoryService categoryService;
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);


    @Autowired
    public CategoryController(CategoryService categoryservice)
    {
        this.categoryService = categoryservice;
    }

    //get all categries
    @GetMapping("/")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<List<Category>> showAllCategories(@RequestParam("userId") String encodedUserId)
    {
        
        try
        {
            LocalDateTime now = LocalDateTime.now();
            Month currentMonth = now.getMonth();
            int currretYear = now.getYear();
            LocalDateTime startOfMonth = LocalDateTime.of(currretYear, currentMonth, 1, 0, 0);
            LocalDateTime endOfMonth = LocalDateTime.of(currretYear, currentMonth, 30, 23, 59);

            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            
            logger.info("Fetching all categories for the month: " + currentMonth);
            List<Category> categories = this.categoryService.getAllUserCategoriesForTheMonth(decodedUserId, false, startOfMonth, endOfMonth);
            return ResponseEntity.ok(categories);
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //create a new category
    @PostMapping("/")
    ResponseEntity<Category> addNewCategory(@RequestBody Category category, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            logger.info("Adding new category");
            Category newCategory = this.categoryService.addNewCategory(category, decodedUserId);
            return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        
    }

    //modify existing category
    @PatchMapping("/{categoryId}")
    ResponseEntity<Category> editCategory(@PathVariable("categoryId") String id, @RequestBody Map<String, Object> attributes, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            Category updatedCategory = this.categoryService.editCategory(id, attributes, decodedUserId);
            logger.info("Correctly edited the category");
            return ResponseEntity.ok(updatedCategory);
            
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred", e);
        }
        
    }

    //delete a category
    @DeleteMapping("/{categoryName}")
    public ResponseEntity<String> deleteCategoryByName(@PathVariable("categoryName") String categoryName, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            String decodedAccountName = URLDecoder.decode(categoryName, "UTF-8");
            boolean deletionSuccessful = this.categoryService.deleteCategory(decodedAccountName, decodedUserId);

            if(deletionSuccessful)
            {
                return ResponseEntity.ok("Category was successfully deleted!");
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account with name - " + categoryName + " - does not exists!");
            }
        } 
        catch(UnsupportedEncodingException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error decoding the account name!");
        }
    }
}
