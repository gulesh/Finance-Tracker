package com.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Category;


public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByName(String categoryName);
    Optional<Category> findById(String id);
    List<Category> findAll();
    void deleteByName(String name);
}
