package com.example.farmerhelp.controller;

import com.example.farmerhelp.model.FarmingSuggestion;
import com.example.farmerhelp.service.FarmingSuggestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/farming-suggestions")
public class FarmingSuggestionController {

    private final FarmingSuggestionService farmingSuggestionService;

    public FarmingSuggestionController(FarmingSuggestionService farmingSuggestionService) {
        this.farmingSuggestionService = farmingSuggestionService;
    }

    @GetMapping
    public ResponseEntity<List<FarmingSuggestion>> getFarmingSuggestions(@RequestParam String season) {
        List<FarmingSuggestion> suggestions = farmingSuggestionService.getFarmingSuggestionsBySeason(season);
        return ResponseEntity.ok(suggestions);
    }
}