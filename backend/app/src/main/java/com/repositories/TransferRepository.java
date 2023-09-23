package com.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.entities.Transfer;


public interface TransferRepository extends MongoRepository<Transfer, String>{
    List<Transfer> findByAccountTo( String transferAccountTo);
    List<Transfer>  findByAccountFrom( String transferAccountFrom);
    @Query("{'date': {$regex: ?0, $options: 'i'}}")
    List<Transfer> findByMonth(String monthRegex, Sort sort); //find Transfers by month sorted by Date
    List<Transfer> findAll();
}
