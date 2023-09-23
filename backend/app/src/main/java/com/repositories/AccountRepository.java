package com.repositories;

import com.entities.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByName(String name);
    List<Account> findAll();
    void deleteByName(String name);
}
