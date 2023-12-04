package com.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="years")
@CompoundIndex(name = "userId_year", def = "{ 'userId' : 1, 'year': 1}", unique = true)
public class Year {
    @Id
    private String id;
    @Indexed
    private int year; 
    @Indexed
    private String userId;
    @DBRef
    private List<Month> months;

    //constructors
    public Year()
    {

    }

    public Year(int year, String userId) {
        this.year = year;
        this.userId = userId;
    }

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Month> getMonths() {
        return months;
    }

    public void setMonths(List<Month> months) {
        this.months = months;
    }

    @Override
    public String toString() {
        return "Year [id=" + id + ", year=" + year + ", userId=" + userId + ", months=" + months + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + year;
        result = prime * result + ((userId == null) ? 0 : userId.hashCode());
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
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (year != other.year)
            return false;
        if (userId == null) {
            if (other.userId != null)
                return false;
        } else if (!userId.equals(other.userId))
            return false;
        if (months == null) {
            if (other.months != null)
                return false;
        } else if (!months.equals(other.months))
            return false;
        return true;
    }

    
    
    
}
