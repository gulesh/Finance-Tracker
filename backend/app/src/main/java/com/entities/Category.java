package com.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "categories")
public class Category {
    @Id
    private String id; // Add this line
    @Indexed(unique = true)
    private String name;
    private double amountAllocated;
    private double amountSpent;
    private boolean recurring;

    //Constructors
    public Category()
    {

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
        return "Category [name=" + name + ", amountAllocated=" + amountAllocated + ", amountSpent="
                + amountSpent + ", isRecurring=" + recurring + "]";
    }

    

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        long temp;
        temp = Double.doubleToLongBits(amountAllocated);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(amountSpent);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + (recurring ? 1231 : 1237);
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
        if (Double.doubleToLongBits(amountAllocated) != Double.doubleToLongBits(other.amountAllocated))
            return false;
        if (Double.doubleToLongBits(amountSpent) != Double.doubleToLongBits(other.amountSpent))
            return false;
        if (recurring != other.recurring)
            return false;
        return true;
    }
 
}
