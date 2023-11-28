package com.repositories;

import com.entities.Account;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByNameAndUserId(String name, String userId);
    Account findByNameAndUserIdAndIsDeleted(String name, String userId, boolean isDeleted);
    List<Account> findByUserIdAndIsDeletedAndCreatedAtBetween(String userId, boolean isDeleted, LocalDateTime start, LocalDateTime end);
    List<Account> findByUserIdAndCreatedAtBetween(String userId, LocalDateTime start, LocalDateTime end); //will be able to fetch queries for given time frame
    List<Account> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Account> findByIsDeleted(boolean isDeleted);
    List<Account> findAll();
    List<Account> findByUserId(String userId); //all account for a user
    List<Account> findByUserIdAndIsDeleted(String userId, boolean isDeleted);
    boolean existsByNameAndUserIdAndIsDeleted(String name, String userId, boolean isDeleted);
    Optional<Account> findById(String id);
    void deleteByNameAndUserId(String name, String userId);
    boolean existsByNameAndUserId(String name, String userId);
    void deleteAll();
}
