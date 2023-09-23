package com.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

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

import com.services.CategoryService;
import com.entities.Category;
import com.exceptionhandler.CategoryNotFound;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    //inject CategoryService here
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryservice)
    {
        this.categoryService = categoryservice;
    }

    //get all categries
    @GetMapping("/")
    public ResponseEntity<List<Category>> showAllCategories()
    {
        List<Category> categories = this.categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    //create a new category
    @PostMapping("/")
    ResponseEntity<Category> addNewCategory(@RequestBody Category category)
    {
        Category newCategory = this.categoryService.addNewCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    //modify existing category
    @PatchMapping("/{categoryName}")
    ResponseEntity<Category> editCategory(@PathVariable("categoryName") String categoryName, @RequestBody Map<String, Object> attributes)
    {
        try
        {
            String decodedCategoryName = URLDecoder.decode(categoryName, "UTF-8");
            Category category = this.categoryService.getCategoryByName(decodedCategoryName);
            if(category != null)
            {
                Category updatedCategory = this.categoryService.editCategory(decodedCategoryName, attributes);
                return ResponseEntity.ok(updatedCategory);
            } 
            else
            {
                throw new CategoryNotFound(decodedCategoryName);
            }
        }
        catch (UnsupportedEncodingException e) 
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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