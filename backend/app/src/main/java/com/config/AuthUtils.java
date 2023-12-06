package com.config;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Collection;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import com.services.UserService;
import com.entities.User;


@Component
public class AuthUtils {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthUtils.class);

    @Autowired
    public AuthUtils(UserService userservice)
    {
        this.userService = userservice;
    }

    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            // Assuming "sub" is the key for user ID in the token claims
            String userId = jwt.getClaim("sub");
            User existinUser = this.userService.getUserByuserId(userId);
            LocalDateTime now = LocalDateTime.now();
            if(existinUser != null)
            {
                existinUser.setLastSignIn(now);
                this.userService.addUpdateUser(existinUser);
            } 
            else
            {
                User newUser = new User(userId, now);
                this.userService.addUpdateUser(newUser);
            }
            return userId;
        }
        // Return null or handle the case where user ID is not available
        return null;
    }
    
    public boolean isCurrentUser(String id)
    {
        String decodedUserId = null;
        String currentUser = this.getCurrentUserId();
    
        try {
            decodedUserId = URLDecoder.decode(id, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // Handle the exception (e.g., log it)
            e.printStackTrace();
        }
        // Directly log the result of the comparison
        boolean result = decodedUserId != null ? decodedUserId.equals(currentUser) : false;
        logger.info("LoggedUser: " + currentUser + ", userRequestingInfo: " + decodedUserId +  ", Comparison Result: " + result);
        return result;
    }

    private Collection<GrantedAuthority> getAuthorities() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            return authentication.getAuthorities().stream()
                .map(authority -> (GrantedAuthority) authority)
                .collect(Collectors.toList());
        }
        return null;  
    }

    public boolean isCurrentUserInRole(String roleName) {
        Collection<GrantedAuthority> authorities = getAuthorities();

        authorities.forEach(authority -> {
            logger.info("Authority: " + authority.getAuthority());
        });
        return authorities.stream().anyMatch(authority -> roleName.equals(authority.getAuthority()));
    }

}