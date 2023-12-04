package com.repositories;

import com.entities.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUserId(String userId);
    List<User> findAll(); 
}
