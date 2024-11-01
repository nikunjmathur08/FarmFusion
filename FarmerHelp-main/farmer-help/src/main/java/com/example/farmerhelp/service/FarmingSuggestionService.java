package com.example.farmerhelp.service;

import com.example.farmerhelp.model.FarmingSuggestion;
import com.example.farmerhelp.repository.FarmingSuggestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmingSuggestionService {

    private final FarmingSuggestionRepository farmingSuggestionRepository;

    public FarmingSuggestionService(FarmingSuggestionRepository farmingSuggestionRepository) {
        this.farmingSuggestionRepository = farmingSuggestionRepository;
    }

    public List<FarmingSuggestion> getFarmingSuggestionsBySeason(String season) {
        return farmingSuggestionRepository.findBySeason(season);
    }

    // Add method to generate farming suggestions based on weather conditions
}