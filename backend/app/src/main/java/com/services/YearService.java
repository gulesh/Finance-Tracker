package com.services;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.repositories.MonthRepository;
import com.repositories.YearRepository;
import com.entities.Month;
import com.entities.Year;

@Service
public class YearService {
    //inject repos here
    private final MonthRepository monthRepo;
    private final YearRepository yearRepo;
    private static final Logger logger = LoggerFactory.getLogger(YearService.class);


    @Autowired
    public YearService(MonthRepository monthrepo, YearRepository yearrepo)
    {
        this.monthRepo = monthrepo;
        this.yearRepo = yearrepo;
    }

    @Scheduled(cron = "0 59 23 31 12 *") //run this job on the last day of the year at 11:59 pm
    public void AddDataToYearCollection()
    {
        LocalDate localDate = LocalDate.now();
        int currentYear = localDate.getYear();
        String currentYearString = String.valueOf(currentYear);

        //check if the year exists
        Year yearExists = this.yearRepo.findByYear(currentYearString);
        List<Month> allMonths = this.monthRepo.findAll();
        if(yearExists != null)
        {
            yearExists.setMonths(allMonths);
            this.yearRepo.save(yearExists);
        } 
        else 
        {
            Year newYear = new Year(currentYearString, allMonths);

            this.yearRepo.save(newYear);

        }
        logger.info("Adding " + currentYear + " to the year collection!"); 

    }

    public List<Year> getAllYears()
    {
        logger.info("getting all the years from the years collection");
        return this.yearRepo.findAll();
    }

    public Year getYearByNumber(String year )
    {
        logger.info("getting the year: " +  year);
        return this.yearRepo.findByYear(year);
    }
}
