package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Year;

public interface YearRepository extends MongoRepository<Year, String>{
    Year findByYear(String year);
    List<Year> findAll();
    Year findByYearAndUserId(int year, String userId);
}
