package com.entities;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection= "users")
public class User {

    @Id
    private String userId;
    @Field("lastSignIn")
    private LocalDateTime lastSignIn;
    @DBRef
    private List<Year> years = new ArrayList<>();
    private boolean isDeleted;
  
    public User()
    {

    }

    public User(String userId, LocalDateTime signedinAt)
    {
        this.userId = userId;
        this.lastSignIn = signedinAt;
        this.isDeleted = false;
    }

    
    @Override
    public String toString() {
        return "User [userId=" + userId + ", lastSignIn=" + lastSignIn + ", years=" + years + ", isDeleted=" + isDeleted
                + "]";
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getLastSignIn() {
        return lastSignIn;
    }

    public void setLastSignIn(LocalDateTime lastSignIn) {
        this.lastSignIn = lastSignIn;
    }


    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public List<Year> getYears() {
        return years;
    }

    public void setYears(List<Year> years) {
        this.years = years;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((userId == null) ? 0 : userId.hashCode());
        result = prime * result + ((lastSignIn == null) ? 0 : lastSignIn.hashCode());
        result = prime * result + ((years == null) ? 0 : years.hashCode());
        result = prime * result + (isDeleted ? 1231 : 1237);
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
        User other = (User) obj;
        if (userId == null) {
            if (other.userId != null)
                return false;
        } else if (!userId.equals(other.userId))
            return false;
        if (lastSignIn == null) {
            if (other.lastSignIn != null)
                return false;
        } else if (!lastSignIn.equals(other.lastSignIn))
            return false;
        if (years == null) {
            if (other.years != null)
                return false;
        } else if (!years.equals(other.years))
            return false;
        if (isDeleted != other.isDeleted)
            return false;
        return true;
    }

    
    
}
