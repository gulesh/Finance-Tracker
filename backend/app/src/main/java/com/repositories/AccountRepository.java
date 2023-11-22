package com.repositories;

import com.entities.Account;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByName(String name);
    Optional<Account> findById(String id);
    List<Account> findAll();
    List<Account> findByUserId(String userId);
    void deleteByName(String name);
}
