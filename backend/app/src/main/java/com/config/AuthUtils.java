package com.config;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;


@Component
public class AuthUtils {
    private static final Logger logger = LoggerFactory.getLogger(AuthUtils.class);

    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            // Assuming "sub" is the key for user ID in the token claims
            Map<String, Object> claims = jwt.getClaims();

            // Display key-value pairs
            for (Map.Entry<String, Object> entry : claims.entrySet()) {
                logger.info("Key: " + entry.getKey() + ", Value: " + entry.getValue());
            }
            return jwt.getClaim("sub");
        }
        // Return null or handle the case where user ID is not available
        return null;
    }
    
    public boolean isCurrentUser(String id)
    {
        String decodedUserId = null;
        String currentUser = this.getCurrentUserId();
        String temp = getCurrentUserId(); //just trying to print all the key value pairs
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