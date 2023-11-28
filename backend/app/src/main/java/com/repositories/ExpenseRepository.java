package com.repositories;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.entities.Expense;

public interface ExpenseRepository extends MongoRepository<Expense, String>{
    List<Expense> findByUserIdAndCategory_Name(String userId, String categoryName); //expense by Category
    List<Expense> findByUserIdAndAccount_Name(String userId, String accountName); //by account name
    @Query("{'date': {$regex: ?1, $options: 'i'}}")
    List<Expense> findByUserIdAndMonth(String userId, String monthRegex, Sort sort); //find expense by month sorted by Date
    @Query("{'category.name' : ?1, 'account.name' : ?2}")
    List<Expense> findByUserIdCategoryNameAndAccountName(String userId, String categoryName, String accountName);
    List<Expense> findByUserId(String userId);
    List<Expense> findByUserIdAndIsDeleted(String userId, boolean isDeleted); 
    List<Expense> findByUserIdAndIsDeletedAndDateBetween(String userId, boolean isDeleted, LocalDate start, LocalDate end);
    List<Expense> findByDateBetween(LocalDate start, LocalDate end);
    List<Expense> findAll();
    Optional<Expense> findById(String id);
    void deleteById(String id);
}
