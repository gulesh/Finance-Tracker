package com.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.services.MonthService;
import com.services.YearService;

@SpringBootTest
public class YearServiceTest {
    private final MonthService monthService;
    private final YearService yearService;

    @Autowired
    public YearServiceTest(MonthService monthservice, YearService yearservice){
        this.monthService = monthservice;
        this.yearService = yearservice;
    }

    @Test
    public void ScheduleTesting(){

    }
}
