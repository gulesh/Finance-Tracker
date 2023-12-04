package com.entities;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="months")
@CompoundIndexes({
    @CompoundIndex(name = "userId_monthName_year", def = "{ 'userId': 1, nameOfTheMonth': 1, 'year': 1}", unique = true)
})
public class Month {
    @Id
    private String id;
    private String nameOfTheMonth;
    @Indexed
    private String userId;
    private List<Category> categories = new ArrayList<>();
    @DBRef
    private List<Expense> expenses = new ArrayList<>();
    @DBRef
    private List<Transfer> transfers = new ArrayList<>();
    private int year;
    //constructors
    public Month()
    {

    }

    public Month(String nameOfTheMonth, String userId, int year) {
        this.nameOfTheMonth = nameOfTheMonth;
        this.userId = userId;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    

    @Override
    public String toString() {
        return "Month [id=" + id + ", nameOfTheMonth=" + nameOfTheMonth + ", userId=" + userId + ", categories="
                + categories + ", expenses=" + expenses + ", transfers=" + transfers + ", year=" + year + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((nameOfTheMonth == null) ? 0 : nameOfTheMonth.hashCode());
        result = prime * result + ((userId == null) ? 0 : userId.hashCode());
        result = prime * result + ((categories == null) ? 0 : categories.hashCode());
        result = prime * result + ((expenses == null) ? 0 : expenses.hashCode());
        result = prime * result + ((transfers == null) ? 0 : transfers.hashCode());
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
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (nameOfTheMonth == null) {
            if (other.nameOfTheMonth != null)
                return false;
        } else if (!nameOfTheMonth.equals(other.nameOfTheMonth))
            return false;
        if (userId == null) {
            if (other.userId != null)
                return false;
        } else if (!userId.equals(other.userId))
            return false;
        if (categories == null) {
            if (other.categories != null)
                return false;
        } else if (!categories.equals(other.categories))
            return false;
        if (expenses == null) {
            if (other.expenses != null)
                return false;
        } else if (!expenses.equals(other.expenses))
            return false;
        if (transfers == null) {
            if (other.transfers != null)
                return false;
        } else if (!transfers.equals(other.transfers))
            return false;
        if (year != other.year)
            return false;
        return true;
    }

    
   
}
