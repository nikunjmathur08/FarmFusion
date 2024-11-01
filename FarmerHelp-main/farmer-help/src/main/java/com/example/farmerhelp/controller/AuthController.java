package com.example.farmerhelp.controller;

import com.example.farmerhelp.model.User;
import com.example.farmerhelp.payload.ApiResponse;
import com.example.farmerhelp.payload.LoginRequest;
import com.example.farmerhelp.payload.SignUpRequest;
import com.example.farmerhelp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private final UserService userService;
    
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        session.setAttribute("userId", user.getId());
        return ResponseEntity.ok(new ApiResponse(true, "User signed in successfully", user.getUsername()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        User user = userService.registerUser(signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());
        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully", user.getUsername()));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOut(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new ApiResponse(true, "User signed out successfully"));
    }
}