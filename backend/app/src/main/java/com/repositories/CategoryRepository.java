package com.repositories;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Category;


public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByNameAndUserId(String name, String userId);
    Category findByNameAndUserIdAndIsDeleted(String name, String userId, boolean isDeleted);
    List<Category> findByUserIdAndIsDeletedAndCreatedAtBetween(String userId, boolean isDeleted, LocalDateTime start, LocalDateTime end);
    List<Category> findByUserIdAndCreatedAtBetween(String userId, LocalDateTime start, LocalDateTime end); 
    List<Category> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Category> findByIsDeleted(boolean isDeleted);
    List<Category> findByUserId(String userId); //all account for a user
    List<Category> findByUserIdAndIsDeleted(String userId, boolean isDeleted);
    boolean existsByNameAndUserIdAndIsDeleted(String name, String userId, boolean isDeleted);
    boolean existsByNameAndUserId(String name, String userId);
    Optional<Category> findById(String id);
    List<Category> findAll();
    void deleteByNameAndUserId(String name, String userId);
    void deleteAll();
}
