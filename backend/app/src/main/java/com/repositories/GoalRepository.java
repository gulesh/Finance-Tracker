package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Goal;


public interface GoalRepository extends MongoRepository<Goal, String>{
    Goal findByName( String goalName);
    List<Goal> findAll();
}
