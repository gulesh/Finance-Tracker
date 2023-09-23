package com.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Month {
    @Id
    private String id;
    @Indexed(unique= true)
    private String nameOfTheMonth;
    @DBRef
    private List<Category> categories;
    private int year;

    //constructors
    public Month()
    {

    }

    public Month(String nameOfTheMonth, int year) {
        this.nameOfTheMonth = nameOfTheMonth;
        this.categories = new ArrayList<>();
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
