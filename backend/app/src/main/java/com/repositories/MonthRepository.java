package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.entities.Month;

public interface MonthRepository extends MongoRepository<Month, String> {
    Month findByNameOfTheMonth(String nameOfTheMonth); 
    List<Month> findAll();
}

