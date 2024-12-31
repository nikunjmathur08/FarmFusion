package com.example.farmerhelp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to Farmer Help API!");
    }

    @GetMapping("/api/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Backend is running successfully!");
    }
}