package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Category;


public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByName(String categoryName);
    List<Category> findAll();
    void deleteByName(String name);
}
