package com.services;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.repositories.YearRepository;
import com.entities.Year;
import com.entities.User;

@Service
public class YearService {
    //inject repos here
    private final UserService userService;
    private final YearRepository yearRepo;
    private static final Logger logger = LoggerFactory.getLogger(YearService.class);


    @Autowired
    public YearService( UserService userservice, YearRepository yearrepo)
    {
        this.userService = userservice;
        this.yearRepo = yearrepo;
    }

    @Scheduled(cron = "0 0 0 1 1 *") //run on the first of every year
    // @Scheduled(cron = "0 */1 * * * ?")
    public void addNewYearPerUserToYearsCollection()
    {
        LocalDate localDate = LocalDate.now();
        int currentYear = localDate.getYear();

        //check if the year exists
        List<User> users = this.userService.getAllUsers();
        for(User usr: users)
        {
            Year newYearPerUser = new Year(currentYear, usr.getUserId());
            //save the year to user DBRefs
            usr.getYears().add(newYearPerUser);
            //save the year to years collection as well
            this.yearRepo.save(newYearPerUser);
        }
        
    }

    public List<Year> getAllYears()
    {
        logger.info("getting all the years from the years collection");
        return this.yearRepo.findAll();
    }


    public Year saveYear(Year year)
    {
        return this.yearRepo.save(year);
    }

    public Year getYearByNumber(String year)
    {
        logger.info("getting the year: " +  year);
        return this.yearRepo.findByYear(year);
    }

    public Year getYearByUserAndyearNumber(String userid, int year)
    {
        return this.yearRepo.findByYearAndUserId(year, userid);
    }
}
