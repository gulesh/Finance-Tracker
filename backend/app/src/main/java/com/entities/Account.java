package com.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

//This is Money account like bank account or credit/debit cards
@Document(collection="accounts")
public class Account{
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String userID;
    private double amount;
    private boolean debt;

    //constructors
    public Account()
    {

    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
    public Account(String name, int amount, boolean isDebt) {
        this.name = name;
        this.amount = amount;
        this.debt = isDebt;
    }

    //getters and setters
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public boolean isDebt() {
        return debt;
    }

    public void setDebt(boolean isDebt) {
        this.debt = isDebt;
    }

    @Override
    public String toString() {
        return "Account [id=" + id + ", name=" + name + ", userID=" + userID + ", amount=" + amount + ", debt=" + debt
                + "]";
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((userID == null) ? 0 : userID.hashCode());
        long temp;
        temp = Double.doubleToLongBits(amount);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + (debt ? 1231 : 1237);
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
        Account other = (Account) obj;
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
        if (userID == null) {
            if (other.userID != null)
                return false;
        } else if (!userID.equals(other.userID))
            return false;
        if (Double.doubleToLongBits(amount) != Double.doubleToLongBits(other.amount))
            return false;
        if (debt != other.debt)
            return false;
        return true;
    } 
    
}
