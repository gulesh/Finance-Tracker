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
    private int amount;
    private boolean debt;

    //constructors
    public Account()
    {

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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
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
        return "Account [name=" + name + ", amount=" + amount + ", isDebt=" + debt + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + amount;
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
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (amount != other.amount)
            return false;
        if (debt != other.debt)
            return false;
        return true;
    } 
    
}
