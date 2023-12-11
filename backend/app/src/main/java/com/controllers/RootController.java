package com.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")

public class RootController {
    @GetMapping("/")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<String> root(@RequestParam("userId") String encodedUserId){
        return ResponseEntity.ok("Hello there! I am root!");
    }
}
