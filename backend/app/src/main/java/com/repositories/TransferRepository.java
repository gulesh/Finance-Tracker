package com.repositories;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.entities.Transfer;


public interface TransferRepository extends MongoRepository<Transfer, String>{
    List<Transfer> findByAccountToAndUserId( String transferAccountTo, String userId);
    List<Transfer>  findByAccountFromAndUserId( String transferAccountFrom, String userId);
    @Query("{'date': {$regex: ?1, $options: 'i'}}")
    List<Transfer> findByUserIdAndMonth(String userId, String monthRegex, Sort sort); //find Transfers by month sorted by Date
    List<Transfer> findByUserIdAndIsDeletedAndDateBetween(String userId, boolean isDeleted, LocalDate start, LocalDate end);
    List<Transfer> findByUserIdAndIsDeleted(String userId, boolean isDeleted); 
    List<Transfer> findAll();
    Optional<Transfer> findById(String id);
    List<Transfer> findByUserId(String userId);
    void deleteById(String id);
}
