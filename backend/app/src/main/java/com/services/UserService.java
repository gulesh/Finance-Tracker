package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.repositories.UserRepository;
import com.entities.User;

@Service
public class UserService {
    private final UserRepository userRepo;
    
    @Autowired
    public UserService(UserRepository userrepo)
    {
        this.userRepo = userrepo;
    }

    public List<User> getAllUsers()
    {
        return this.userRepo.findAll();
    }

    public User getUserByuserId(String userId)
    {
        return this.userRepo.findByUserId(userId);
    }

    public User addUpdateUser(User user)
    {
        return this.userRepo.save(user);
    }

    public boolean checkIfUserExists(String userId)
    {
        return this.userRepo.existsByUserId(userId);
    }

    
}
