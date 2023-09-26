package com.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="years")
public class Year {
    @Id
    private String id;
    @Indexed(unique = true)
    private int year; 
    @DBRef
    private List<Month> months;

    //constructors
    public Year()
    {

    }

    public Year(int year, List<Month> months) {
        this.year = year;
        this.months = months;
    }


    //getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<Month> getMonths() {
        return months;
    }

    public void setMonths(List<Month> months) {
        this.months = months;
    }

    @Override
    public String toString() {
        return "Year [year=" + year + ", months=" + months + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + year;
        result = prime * result + ((months == null) ? 0 : months.hashCode());
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
        Year other = (Year) obj;
        if (year != other.year)
            return false;
        if (months == null) {
            if (other.months != null)
                return false;
        } else if (!months.equals(other.months))
            return false;
        return true;
    } 
    
}
