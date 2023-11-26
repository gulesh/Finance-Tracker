package com.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection= "categories")
@CompoundIndexes({
    @CompoundIndex(name = "Name_userIdNotDeleted", def = "{'name': 1, 'userId': 1}", unique = true, partialFilter = "{ 'isDeleted' : false }"),
    @CompoundIndex(name = "Name_userId", def = "{'name': 1, 'userId': 1}")
})
public class Category {
    @Id
    private String id; // Add this line
    private String name;
    @Indexed
    private String userId;
    private double amountAllocated;
    private double amountSpent;
    @Field("isDeleted")
    private boolean isDeleted;
    private boolean recurring;
    @Field("createdAt")
    private LocalDateTime createdAt;

    //Constructors
    public Category()
    {

    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Category(String name, int amountAllocated, int amountSpent, boolean isRecurring) {
        this.name = name;
        this.amountAllocated = amountAllocated;
        this.amountSpent = amountSpent;
        this.recurring = isRecurring;
    }

    //getters and setters
    // Add getters and setters for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmountAllocated() {
        return amountAllocated;
    }

    public void setAmountAllocated(double amountAllocated) {
        this.amountAllocated = amountAllocated;
    }

    public double getAmountSpent() {
        return amountSpent;
    }

    public void setAmountSpent(double amountSpent) {
        this.amountSpent = amountSpent;
    }

    public boolean isRecurring() {
        return recurring;
    }

    public void setRecurring(boolean isRecurring) {
        this.recurring = isRecurring;
    }

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + ", userId=" + userId + ", amountAllocated=" + amountAllocated
                + ", amountSpent=" + amountSpent + ", isDeleted=" + isDeleted + ", recurring=" + recurring
                + ", createdAt=" + createdAt + "]";
    }

    

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((userId == null) ? 0 : userId.hashCode());
        long temp;
        temp = Double.doubleToLongBits(amountAllocated);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(amountSpent);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + (isDeleted ? 1231 : 1237);
        result = prime * result + (recurring ? 1231 : 1237);
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
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
        Category other = (Category) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (userId == null) {
            if (other.userId != null)
                return false;
        } else if (!userId.equals(other.userId))
            return false;
        if (Double.doubleToLongBits(amountAllocated) != Double.doubleToLongBits(other.amountAllocated))
            return false;
        if (Double.doubleToLongBits(amountSpent) != Double.doubleToLongBits(other.amountSpent))
            return false;
        if (isDeleted != other.isDeleted)
            return false;
        if (recurring != other.recurring)
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        return true;
    }
 
}
