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
import com.entities.User;
import com.entities.Year;
import com.exceptionhandler.MonthServiceException;

import com.repositories.MonthRepository;


@Service
public class MonthService {
    //inject month repo
    private final MonthRepository monthRepo;
    private final CategoryService categoryService;
    private final ExpenseService expenseService;
    private final TransferService transferService;
    private final UserService userService;
    private final YearService yearService;
    private static final Logger logger = LoggerFactory.getLogger(MonthService.class);

    @Autowired
    public MonthService(MonthRepository monthrepo, CategoryService categoryservice, ExpenseService expenseservice, 
                        TransferService transferservice, UserService userservice, YearService yearservice)
    {
        this.monthRepo = monthrepo;
        this.categoryService = categoryservice;
        this.expenseService = expenseservice;
        this.transferService = transferservice;
        this.userService = userservice;
        this.yearService = yearservice;
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

            //get all the users
            List<User> users = this.userService.getAllUsers();
            String monthName = currentMonth.getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            for(User usr: users)
            {
                String userid = usr.getUserId();
                Month newMonthPerUser = new Month(monthName, userid, currentYear);
                List<Category> categoriesForTheUserForTheMonth = this.categoryService.getAllActiveCategoriesForTheMonth(userid);
                List<Expense> expensesForTheUserForTheMonth = this.expenseService.getCurrrentMonthActiveExpensesForTheUser(userid);
                List<Transfer> transfersForTheUserForTheMonth = this.transferService.getCurrrentMonthActiveTransfersForTheUser(userid);

                // Save categories in a batch after the loop
                List<Category> updatedCategories = new ArrayList<>();
                for (Category cat : categoriesForTheUserForTheMonth) {
                    // Add the category to the month
                    newMonthPerUser.getCategories().add(cat);

                    // Check if recurring
                    if (cat.isRecurring()) {
                        cat.setAmountSpent(0);
                    } else {
                        cat.setDeleted(true);
                    }

                    // Add the category to the batch for update
                    updatedCategories.add(cat);
                }

                //add expenses and transfer to the month
                newMonthPerUser.setExpenses(expensesForTheUserForTheMonth);
                newMonthPerUser.setTransfers(transfersForTheUserForTheMonth);
                this.monthRepo.save(newMonthPerUser);
                this.categoryService.saveAllcCategories(updatedCategories);

                for (Expense expense : expensesForTheUserForTheMonth) {
                    expense.setDeleted(true);
                }
                this.expenseService.saveAllExpenses(expensesForTheUserForTheMonth);

                for (Transfer transfer : transfersForTheUserForTheMonth) {
                    transfer.setDeleted(true);
                }
                this.transferService.saveAllTransfers(transfersForTheUserForTheMonth);
                logger.info("The Schedule trsanction for the month " + monthName  + " and year " + currentYear + " is complete for the user: " + userid);

                //next add add to the years collections as well for the user:
                Year yearforuser = this.yearService.getYearByUserAndyearNumber(userid, currentYear);
                if(yearforuser == null)
                {
                    yearforuser = new Year(currentYear, userid);
                    usr.getYears().add(yearforuser);
                }
                yearforuser.getMonths().add(newMonthPerUser);
                this.yearService.saveYear(yearforuser);
                this.userService.addUpdateUser(usr);
                
            }
            
            logger.info("The Schedule trsanction for the month " + "monthName"  + " and year " + currentYear + " is complete for all users!");
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
