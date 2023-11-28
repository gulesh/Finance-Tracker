package com.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="months")
@CompoundIndexes({
    @CompoundIndex(name = "monthName_year", def = "{ 'nameOfTheMonth': 1, 'year': 1}", unique = true)
})
public class Month {
    @Id
    private String id;
    private String nameOfTheMonth;
    private List<Category> categories;
    @DBRef
    private List<Expense> expenses;
    @DBRef
    private List<Transfer> transfers;
    private int year;
    //constructors
    public Month()
    {

    }

    public Month(String nameOfTheMonth, int year) {
        this.nameOfTheMonth = nameOfTheMonth;
        this.categories = new ArrayList<>();
        this.expenses = new ArrayList<>();
        this.transfers = new ArrayList<>();
        this.year = year;
    }

    //getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getNameOfTheMonth() {
        return nameOfTheMonth;
    }

    public void setNameOfTheMonth(String nameOfTheMonth) {
        this.nameOfTheMonth = nameOfTheMonth;
    }

    public List<Category> getCategories() {
        return categories;
    }


    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }

    public List<Transfer> getTransfers() {
        return transfers;
    }

    public void setTransfers(List<Transfer> transfers) {
        this.transfers = transfers;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "Month [nameOfTheMonth=" + nameOfTheMonth + ", year=" + year + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nameOfTheMonth == null) ? 0 : nameOfTheMonth.hashCode());
        result = prime * result + year;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Month other = (Month) obj;
        if (nameOfTheMonth == null) {
            if (other.nameOfTheMonth != null)
                return false;
        } else if (!nameOfTheMonth.equals(other.nameOfTheMonth))
            return false;
        if (year != other.year)
            return false;
        return true;
    }
   
}
