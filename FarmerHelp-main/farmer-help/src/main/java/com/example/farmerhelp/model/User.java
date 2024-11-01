package com.example.farmerhelp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    public long getId(){
        return id;
    }

    @Column(unique = true, nullable = false)
    private String username;

    public String getUsername(){
        return username;
    }

    @Column(unique = true, nullable = false)
    private String email;

    public String getEmail(){
        return email;
    }

    @Column(nullable = false)
    private String password;

    public String getPassword(){
        return password;
    }

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}