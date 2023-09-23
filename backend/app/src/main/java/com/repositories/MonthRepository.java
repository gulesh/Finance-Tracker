package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param; // Import the correct Param annotation

import com.entities.Month;

public interface MonthRepository extends MongoRepository<Month, String> {
    Month findByNameOfTheMonth(@Param("nameOfTheMonth") String nameOfTheMonth); // Use @Param with the correct name
    List<Month> findAll();
}

