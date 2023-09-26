package com.services;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.entities.Category;
import com.entities.Expense;
import com.entities.Month;
import com.entities.Transfer;
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

    @Scheduled(cron = "59 59 23 28-31 * ?") //run on last day of the month at 11:59 pm;
    public void AddDataToMonthCollection()
    {
        
        LocalDate localDate = LocalDate.now();
        int currentYear = localDate.getYear();
        java.time.Month currentMonth = localDate.getMonth();
        String monthName = currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH); //get full name in English

        //check if the month already exists
        Month monthExists = this.monthRepo.findByNameOfTheMonth(monthName);

        //get data from the collections
        List<Category> categoriesForThisMonth = this.categoryRepo.findAll();
        List<Transfer> transfersForThisMonth = this.transferRepo.findAll();
        List<Expense> expensesForThisMonth = this.expenseRepo.findAll();

        if (monthExists != null){
            //get categories and other and all to the month and set the attributes 
            monthExists.setExpenses(expensesForThisMonth);
            monthExists.setTransfers(transfersForThisMonth);
            monthExists.setCategories(categoriesForThisMonth);

            this.monthRepo.save(monthExists);

            //now reset the spent amount of the categories
            for(Category category: categoriesForThisMonth)
            {
                category.setAmountSpent(0);
            }


        } else {
            Month newMonth = new Month(monthName, currentYear);

            //set the attributes
            newMonth.setExpenses(expensesForThisMonth);
            newMonth.setTransfers(transfersForThisMonth);
            newMonth.setCategories(categoriesForThisMonth);

            //add to the collection
            this.monthRepo.save(newMonth);
        }
        logger.info("Added" + monthName  + "to the months collection for the year: " + currentYear);
    }

    public List<Month> getAllMonths()
    {
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
        catch(DataAccessException e )
        {
            throw new MonthServiceException("Error adding month ", e);
        }
    }
}
