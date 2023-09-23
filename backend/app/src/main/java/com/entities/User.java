package com.entities;


import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "users")
public class User {
    private String id;
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private int favNumber;
    public User()
    {

    }

    public User(String firstname, String lastname, int favnum)
    {
        this.firstName = firstname;
        this.lastName = lastname;
        this.favNumber = favnum;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getFavNumber() {
        return favNumber;
    }

    public void setFavNumber(int favNumber) {
        this.favNumber = favNumber;
    }
    
    
}
