package com.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.entities.Year;

import jakarta.websocket.server.PathParam;

public interface YearRepository extends MongoRepository<Year, String>{
    Year findByYear(@PathParam("year") String year);
    List<Year> findAll();
}
