package com.repositories;

import com.entities.Account;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByNameAndUserId(String name, String userId);
    Optional<Account> findById(String id);
    List<Account> findAll();
    List<Account> findByUserId(String userId); //all account for a user
    void deleteByNameAndUserId(String name, String userId);
    boolean existsByNameAndUserId(String name, String userId);
}
