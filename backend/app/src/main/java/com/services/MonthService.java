package com.services;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.ArrayList;
import java.util.Locale;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entities.Category;
import com.entities.Expense;
import com.entities.Transfer;
import com.entities.Month;
import com.exceptionhandler.MonthServiceException;
import com.repositories.CategoryRepository;
import com.repositories.ExpenseRepository;
import com.repositories.MonthRepository;
import com.repositories.TransferRepository;

@Service
public class MonthService {
    //inject month repo
    private final MonthRepository monthRepo;
    private final CategoryRepository categoryRepo;
    private final ExpenseRepository expenseRepo;
    private final TransferRepository transferRepo;
    private static final Logger logger = LoggerFactory.getLogger(MonthService.class);

    @Autowired
    public MonthService(MonthRepository monthrepo, CategoryRepository categoryrepo, ExpenseRepository expenserepo, 
                        TransferRepository transferrepo)
    {
        this.monthRepo = monthrepo;
        this.categoryRepo = categoryrepo;
        this.expenseRepo = expenserepo;
        this.transferRepo = transferrepo;
    }
    
    //@Scheduled(cron = "0 * * * * ?")
    @Scheduled(cron = "0 59 23 28-31 * ?") //run on last day of the month at 11:59 PM;
    @Transactional
    public void AddDataToMonthCollectionAtTheEndOfTheMonth()
    {
        try
        {
            LocalDate localDate = LocalDate.now();
            int currentYear = localDate.getYear();
            LocalDateTime now = LocalDateTime.now();
            java.time.Month currentMonth = now.getMonth();
            
            LocalDateTime startOfMonth = LocalDateTime.of(currentYear, currentMonth, 1, 0, 0);
            LocalDateTime endOfMonth = LocalDateTime.of(currentYear, currentMonth, 30, 23, 59);
            
            LocalDate firstDayOfMonth = localDate.withDayOfMonth(1);
            LocalDate lastdayOfMonth = localDate.withDayOfMonth(localDate.lengthOfMonth());


            //get data from the collections for the month
            List<Category> categoriesForThisMonth = this.categoryRepo.findByCreatedAtBetween(startOfMonth, endOfMonth);
            List<Transfer> transfersForThisMonth = this.transferRepo.findByDateBetween(firstDayOfMonth, lastdayOfMonth);
            List<Expense> expensesForThisMonth = this.expenseRepo.findByDateBetween(firstDayOfMonth, lastdayOfMonth);


            String monthName = currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH); //get full name in English
            Month newMonth = new Month(monthName, currentYear);

            //set the attributes
            newMonth.setExpenses(expensesForThisMonth);
            newMonth.setTransfers(transfersForThisMonth);
            // newMonth.setCategories(categoriesForThisMonth);
            List<Category> categoriesToBeAdded = new ArrayList<>();

            //Edit categories: set spent amount to 0 for recurring categories
            for(Category category : categoriesForThisMonth)
            {
                if(category.isRecurring())
                {
                    categoriesToBeAdded.add(category); //get the category before resettign the spent amount
                    category.setAmountSpent(0);
                } 
                else 
                {
                    
                    category.setDeleted(true);
                    categoriesToBeAdded.add(category); //update the isdeleted and then add
                } 
            }
            //save to the month collection
            newMonth.setCategories(categoriesToBeAdded); //this list marks the non recurring categories ad deleted
            this.monthRepo.save(newMonth);
            logger.info("Added " + monthName  + " to the months collection for the year: " + currentYear);
            
            //add to the collection
            this.categoryRepo.saveAll(categoriesForThisMonth);

            //mark all the expenses as deleted 
            for(Expense expense: expensesForThisMonth)
            {
                expense.setDeleted(true);
            }
            this.expenseRepo.saveAll(expensesForThisMonth);

            //mark all the transfer as deleted
            for(Transfer transfer : transfersForThisMonth)
            {
                transfer.setDeleted(true);
            }
            this.transferRepo.saveAll(transfersForThisMonth);
            logger.info("The Schedule trsaction for the month " + monthName  + " and year " + currentYear + " is complete!");
        }
        catch (Exception e)
        {
            logger.error("An error occurred during the scheduled monthly task", e);
        }
          
    }

    public List<Month> getAllMonths()
    {
        logger.info("getting all the months from the months collection");
        return this.monthRepo.findAll();
    }

    public Month getMonthByName(String name)
    {
        return this.monthRepo.findByNameOfTheMonth(name);
    }

    public Month addNewMonth(Month month) throws MonthServiceException
    {
        try{
            return this.monthRepo.save(month);
        }
        catch(MonthServiceException e )
        {
            throw new MonthServiceException("Error adding month ", e);
        }
    }

    public List<Month> getAllMonthsDataForTheYear(int year)
    {
        return this.monthRepo.findByYear(year);
    }
}
