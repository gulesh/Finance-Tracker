package com.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Month;
import com.services.MonthService;

@RestController
@RequestMapping("/months")
public class MonthController {
    //inject month repo
    private final MonthService monthService;

    @Autowired
    public MonthController(MonthService monthservice)
    {
        this.monthService = monthservice;
    }

    @GetMapping("/")
    public ResponseEntity<List<Month>> showAllAccount()
    {
        List<Month> months = this.monthService.getAllMonths();
        return ResponseEntity.ok(months);
    }
    
}
