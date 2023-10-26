package com.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.entities.Expense;

public interface ExpenseRepository extends MongoRepository<Expense, String>{
    List<Expense> findByCategory_Name(String categoryName); //expense by Category
    List<Expense> findByAccount_Name(String accountName); //by account name
    @Query("{'date': {$regex: ?0, $options: 'i'}}")
    List<Expense> findByMonth(String monthRegex, Sort sort); //find expense by month sorted by Date
    @Query("{'category.name' : ?0, 'account.name' : ?1}")
    List<Expense> findByCategoryNameAndAccountName(String categoryName, String accountName);
    List<Expense> findAll();
    void deleteById(String id);
}
