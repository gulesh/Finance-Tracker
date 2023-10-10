package com.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
    public ResponseEntity<List<Category>> showAllCategories()
    {
        logger.info("Fetching all categories");
        List<Category> categories = this.categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    //create a new category
    @PostMapping("/")
    ResponseEntity<Category> addNewCategory(@RequestBody Category category)
    {
        logger.info("Adding new category");
        Category newCategory = this.categoryService.addNewCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    //modify existing category
    @PatchMapping("/{categoryId}")
    ResponseEntity<Category> editCategory(@PathVariable("categoryId") String id, @RequestBody Map<String, Object> attributes)
    {
        System.out.println("correctly reached the route" + id);
        try
        {
            Category updatedCategory = this.categoryService.editCategory(id, attributes);
            logger.info("Correctly edited the category");
            return ResponseEntity.ok(updatedCategory);
            
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred", e);
        }
        
    }

    //delete a category
    @DeleteMapping("/{categoryName}")
    public ResponseEntity<String> deleteCategoryByName(@PathVariable("categoryName") String categoryName)
    {
        try
        {
            String decodedAccountName = URLDecoder.decode(categoryName, "UTF-8");
            boolean deletionSuccessful = this.categoryService.deleteCategory(decodedAccountName);

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
